from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room


class SetUsername(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        username = request.data.get('currentUsername')
        if username != None:
            self.request.session['username'] = username

            return Response({'message':'Username succesfully applied'}, status=status.HTTP_200_OK)

        return Response({'Bad Request':'Invalid Post data, did not find username key'}, status=status.HTTP_400_BAD_REQUEST)


class GetUsername(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
   

        username = self.request.session.get('username')
        if username != None:
            return JsonResponse({'currentUsername':username}, status=status.HTTP_200_OK)

        return Response({'Bad request': 'Username does not exist'}, status=status.HTTP_403_FORBIDDEN)

 

class CreateRoom(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key

            room = Room(host=host, votes_to_skip=votes_to_skip)
            room.save()
            self.request.session['room_code'] = room.code

            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad request':'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


class GetRoomInfo(APIView):
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)

        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host

                return Response(data, status=status.HTTP_200_OK)

            return Response({'Room not found':'Invalid room code'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad request': 'code parameter not found'}, status=status.HTTP_400_BAD_REQUEST)
        
