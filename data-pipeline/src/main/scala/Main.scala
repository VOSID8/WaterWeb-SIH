import org.apache.log4j.Logger
import org.apache.flink.api.common.eventtime.WatermarkStrategy
import org.apache.flink.api.common.serialization.SimpleStringSchema
import org.apache.flink.connector.kafka.source.KafkaSource
import org.apache.flink.connector.kafka.sink.KafkaRecordSerializationSchema
import org.apache.flink.connector.kafka.sink.KafkaSink
import org.apache.flink.connector.kafka.source.enumerator.initializer.OffsetsInitializer
import org.apache.flink.streaming.api.scala._
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer
import org.apache.flink.streaming.api.functions.sink.SinkFunction
import org.apache.kafka.clients.consumer.{ConsumerRecords, KafkaConsumer}
import scala.collection.JavaConversions._
import com.datastax.spark.connector._
import org.apache.spark.sql.functions._
import org.apache.spark.sql.cassandra._
import org.apache.spark._
import org.apache.spark.sql._
import com.datastax.spark.connector._
import com.datastax.spark.connector.cql.CassandraConnector
import org.apache.spark.sql.streaming.Trigger
import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.{SparkSession, Row}
import org.apache.spark.sql.types.{StructType, StructField, StringType, IntegerType, FloatType}
import org.apache.spark.sql._
import java.util
import java.util.Properties


case class SensorData(sensor_id: Int, canal_id: Int, level: Int)

object main extends App {
  @transient lazy val logger: Logger = Logger.getLogger(getClass.getName)

  val spark = SparkSession.builder()
      .master("local[3]")
      .appName("enrichment")
      .config("spark.streaming.stopGracefullyOnShutdown", "true")
      .config("spark.sql.shuffle.partitions", 2)
      .config("spark.cassandra.connection.host", "localhost")
      .config("spark.cassandra.connection.port", "9042")
      .config("spark.sql.extensions", "com.datastax.spark.connector.CassandraSparkExtensions")
      .config("spark.sql.catalog.lh", "com.datastax.spark.connector.datasource.CassandraCatalog")
      .getOrCreate()
  
  val schema = StructType(Seq(
    StructField("sensor_id", IntegerType, nullable = false),
    StructField("canal_id", IntegerType, nullable = false),
    StructField("level", IntegerType, nullable = false)
  ))

  val schema2 = StructType(Seq(
    StructField("canal_id", IntegerType, nullable = false),
    StructField("flow", FloatType, nullable = false),
    StructField("status", IntegerType, nullable = false)
  ))

  val env = StreamExecutionEnvironment.getExecutionEnvironment
  val kafkaSource = KafkaSource.builder()
  .setBootstrapServers("localhost:9092")
  .setTopics("flinkex")
  .setGroupId("flink-consumer-group")
  .setStartingOffsets(OffsetsInitializer.latest())
  .setValueOnlyDeserializer(new SimpleStringSchema())
  .build()

  val serializer = KafkaRecordSerializationSchema.builder()
  .setValueSerializationSchema(new SimpleStringSchema())
  .setTopic("flinkout")
  .build()

  val kafkaSink = KafkaSink.builder()
  .setBootstrapServers("localhost:9092")
  .setRecordSerializer(serializer)
  .build()

  val stream2 = env.fromSource(kafkaSource, WatermarkStrategy.noWatermarks(), "Kafka Source")

  val stream1 = stream2.map(x => {
    val arr = x.split(",")
    val sensor_id = arr(0).toInt
    val canal_id = arr(1).toInt
    val level = arr(2).toInt
    val data = Seq((sensor_id, canal_id, level))
    val rows = data.map { case (sensor_id, canal, level) => Row(sensor_id, canal, level) }
    val df = spark.createDataFrame(spark.sparkContext.parallelize(rows), schema)
    df.write
      .format("org.apache.spark.sql.cassandra")
      .options(Map("keyspace" -> "canals_db", "table" -> "sensors")) 
      .mode("append")
      .save()
    val sensorsDb = spark.read
      .format("org.apache.spark.sql.cassandra")
      .option("keyspace", "canals_db")
      .option("table", "sensors")
      .load()
    val canalDb = spark.read
      .format("org.apache.spark.sql.cassandra")
      .option("keyspace", "canals_db")
      .option("table", "canals")
      .load()
    import spark.implicits._
    val flow = sensorsDb.filter(sensorsDb("canal_id") === canal_id)
      .agg(avg("level")).first().getDouble(0).toFloat
    val flow_canal = canalDb.filter(canalDb("canal_id") === canal_id)
      .first().getFloat(1).toFloat
    val status = canalDb.filter(canalDb("canal_id") === canal_id)
      .first().getInt(2).toInt
    var status_new:Int = status;
    if(flow == 0){status_new= 0;}
    else if(flow>0 && flow<1){status_new = 1;}
    else if(flow>=1 && flow<2){status_new = 2;}
    else{status_new = 3;}
    if(flow!=flow_canal){
      val data2 = Seq((canal_id, flow, status_new))
      val rows2 = data2.map { case (canal_id, flow, status_new) 
        => Row(canal_id, flow, status_new) }
      val df2 = spark.createDataFrame(spark.sparkContext.parallelize(rows2), schema2)
      df2.write
        .format("org.apache.spark.sql.cassandra")
        .options(Map("keyspace" -> "canals_db", "table" -> "canals")) 
        .mode("append")
        .save()
    }
    val combined = s"$canal_id,$flow,$status_new"
    println(combined)
    combined
  })
  //println(stream1)
  // val formattedStream: DataStream[String] = stream1.flatMap(_.map {
  //   case (a, b, c) => s"$a,$b,$c"
  // }).map(_.mkString(""))
  stream1.sinkTo(kafkaSink)
  // val formattedStream: DataStream[String] = combined.flatMap(_.map {
  //         case (a, b, c) => s"$a,$b,$c"
  //       }).map(_.mkString(""))
  // formattedStream.sinkTo(kafkaSink)
    //   // if(flow_avg>flow_canal){
    //   //   val x = "open"
    //   //   val combined = (canal_id, flow_avg, x)
    //   // }
    //   // else{
    //   //   val x = "close"
    //   //   val combined = (canal_id, flow_avg, x)
    //   // }
      
    //   // val combined = (canal_id, flow_avg, x)
    
    //combined
  //}
  //formattedStream.sinkTo(kafkaSink)
  env.execute("main")

}

