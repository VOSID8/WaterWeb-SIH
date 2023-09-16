from django.contrib import admin
from .models import Pipeline

# Register your models here.

class PipelineAdmin(admin.ModelAdmin):
    list_display = ('id', 'level')

admin.site.register(Pipeline, PipelineAdmin)
