from django.urls import path
from .views import SetUsername, GetUsername

urlpatterns = [
    path('set-username', SetUsername.as_view()),
    path('get-username', GetUsername.as_view()),
]