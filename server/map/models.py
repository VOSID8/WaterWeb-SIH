from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Pipeline(models.Model):
    level = models.IntegerField(default=0)
    coordinates = ArrayField(ArrayField(models.FloatField()))
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id)
