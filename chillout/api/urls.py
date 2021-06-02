from django.urls import path
from .views import SetUsername, GetUsername, CreateRoom, GetRoomInfo

urlpatterns = [
    path('set-username', SetUsername.as_view()),
    path('get-username', GetUsername.as_view()),
    path('create-room', CreateRoom.as_view()),
    path('get-room', GetRoomInfo.as_view())
]