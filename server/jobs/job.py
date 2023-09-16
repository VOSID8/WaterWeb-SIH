from kafka import KafkaConsumer

from django.conf import settings
from map.models import Pipeline

from datetime import datetime

def listenData():

    consumer  = KafkaConsumer(
        settings.KAFKA_TOPIC,
        bootstrap_servers = [settings.KAFKA_BOOTSTRAP_SERVER]
    )

    for message in consumer:
        msg = message.value.decode('utf-8')

        try:
            msg = msg.split(',')
            level = int(msg[-1])
            pipeid = int(msg[0])

            instance = Pipeline.objects.filter(id=pipeid).first()

            if instance is None or level < 1 or level > 3:
                raise BaseException

            instance.level = level
            instance.save()

        except:
            with open('logs/kafka-invalid-data.log', 'a') as f:
                f.write(msg)
                f.write(' ')
                f.write(datetime.now())
                f.write('\n')
