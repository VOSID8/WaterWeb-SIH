from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .models import Pipeline
from .serializers import PipelineSerializer

from datetime import datetime, timedelta

# Create your views here.

class AllPipes(APIView):
    def get(self, request):
        queryset = Pipeline.objects.all()
        serializer = PipelineSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdatedLevel(APIView):
    def get(self, request):
        threshold = datetime.now() - timedelta(minutes=5)
        queryset = Pipeline.objects.filter(last_updated__gte=threshold)
        serializer = PipelineSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
