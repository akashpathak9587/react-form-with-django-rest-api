from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserInfoViewSet


router = DefaultRouter()
router.register('users', UserInfoViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
]