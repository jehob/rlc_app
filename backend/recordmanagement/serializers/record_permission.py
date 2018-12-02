from rest_framework import serializers
from backend.recordmanagement import models
from backend.api.serializers.user import UserProfileNameSerializer, UserProfileSerializer


class RecordPermissionSerializer(serializers.ModelSerializer):
    request_from = UserProfileSerializer(many=False, read_only=True)
    request_granted = UserProfileNameSerializer(many=False, read_only=True)

    class Mega:
        model = models.RecordPermission
        fields = '__all__'
