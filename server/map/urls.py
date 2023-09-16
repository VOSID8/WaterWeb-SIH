from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.AllPipes.as_view()),
    path('updated/', views.UpdatedLevel.as_view())
]