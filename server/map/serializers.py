from rest_framework.serializers import ModelSerializer
from .models import Pipeline

class PipelineSerializer(ModelSerializer):
    class Meta:
        model = Pipeline
        fields = ('id', 'level', 'coordinates')
