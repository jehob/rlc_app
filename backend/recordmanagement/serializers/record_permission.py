from rest_framework import serializers
from backend.recordmanagement import models
from backend.api.serializers.user import UserProfileNameSerializer, UserProfileSerializer


class RecordPermissionSerializer(serializers.ModelSerializer):
    request_from = UserProfileNameSerializer(many=False, read_only=True)
    request_processed = UserProfileNameSerializer(many=False, read_only=True)

    class Meta:
        model = models.RecordPermission
        fields = '__all__'
