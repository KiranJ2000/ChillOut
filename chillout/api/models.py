from django.db import models
import random
import string

# Create your models here.

def unique_room_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code



class Room(models.Model):
    code = models.CharField(max_length=8, default=unique_room_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    

