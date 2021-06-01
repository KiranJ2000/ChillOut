from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


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

 

