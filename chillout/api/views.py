from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room, UserValues

import ast


class IsUserNameSet(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if 'username' in self.request.session:
            return Response({'Username already available':'Valid'}, status=status.HTTP_200_OK)

        return Response({'No username Found' : 'Invalid'}, status=status.HTTP_401_UNAUTHORIZED)


class SetUsername(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        username = request.data.get('currentUsername')

        if username != None:
            users = UserValues.objects.filter(username=username)
            if len(users) > 0:
                return Response({'Username Taken':'Type another username'}, status=status.HTTP_406_NOT_ACCEPTABLE)

            self.request.session['username'] = username
            user = UserValues(username=username)

            user.save()
            
            return Response({'message':'Username succesfully applied'}, status=status.HTTP_200_OK)

        return Response({'Bad Request':'Invalid Post data, did not find username key'}, status=status.HTTP_400_BAD_REQUEST)


class GetUsernameAndRoomCode(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
   

        username = self.request.session.get('username')
        room_code = self.request.session.get('room_code')

        if username != None:
            return JsonResponse({'currentUsername':username, 'roomCode':room_code}, status=status.HTTP_200_OK)

        return Response({'Bad request': 'Username does not exist'}, status=status.HTTP_403_FORBIDDEN)

 

class CreateRoom(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if self.request.session.get('username') == None:
            return Response({'Unauthorized Entry!'}, status=status.HTTP_401_UNAUTHORIZED)


        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key

            room = Room(host=host, votes_to_skip=votes_to_skip)
            jsonUserList = str({self.request.session['username']})

            room.users_in_room = jsonUserList

            self.request.session['room_code'] = room.code

            room.save()


            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad request':'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


class EnterRoom(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if self.request.session.get('username') == None:
            return Response({'Unauthorized Entry!'}, status=status.HTTP_401_UNAUTHORIZED)

        room_code = request.data.get('roomCode')

        if room_code != None:
            room = Room.objects.filter(code=room_code)

            if len(room) > 0:
                self.request.session['room_code'] = room_code
                room = room[0]

                in_room_users = room.users_in_room
                in_room_users = ast.literal_eval(in_room_users)

                in_room_users.add(self.request.session['username'])
                in_room_users = str(in_room_users)
                room.users_in_room = in_room_users

                room.save(update_fields=['users_in_room'])

                return Response({'Room Joined!':'Joining complete!'}, status=status.HTTP_200_OK)

            return Response({'Room not found!' : 'Invalid room code'}, status=status.HTTP_404_NOT_FOUND)

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
        

class LeaveRoom(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if 'room_code' in self.request.session:
            query_set = Room.objects.filter(code=self.request.session['room_code'])

            if len(query_set) > 0:
                room = query_set[0]
                in_room_users = room.users_in_room
                in_room_users = ast.literal_eval(in_room_users)

                if self.request.session['username'] in in_room_users:
                    in_room_users.remove(self.request.session['username'])

                
                in_room_users = str(in_room_users)
                room.users_in_room = in_room_users

                room.save(update_fields=['users_in_room'])
                self.request.session.pop('room_code')
            
                # If the person who left the room is the host, delete the room
            # if len(room) > 0:
            #     room = room[0]
            #     room.delete()

            return Response({'Deletion successfull':'Success'}, status=status.HTTP_200_OK)
        return Response({'NO code found':'Not found'}, status=status.HTTP_404_NOT_FOUND)