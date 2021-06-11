from django.urls import path
from .views import SetUsername, GetUsernameAndRoomCode, CreateRoom, GetRoomInfo, LeaveRoom, IsUserNameSet, EnterRoom, UsersInRoom

urlpatterns = [
    path('username-available', IsUserNameSet.as_view()),
    path('set-username', SetUsername.as_view()),
    path('get-username-roomcode', GetUsernameAndRoomCode.as_view()),
    path('create-room', CreateRoom.as_view()),
    path('enter-room', EnterRoom.as_view()),
    path('get-room', GetRoomInfo.as_view()),
    path('get-users', UsersInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view())
]