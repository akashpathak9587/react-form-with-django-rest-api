from rest_framework import viewsets
from .models import UserInfo
from .serializers import UserInfoSerializer

class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer