from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class index(APIView):
    def get(self, request, format=None):
        return Response({'Heyy':'yolo'}, status=status.HTTP_200_OK)