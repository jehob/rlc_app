
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from backend.recordmanagement import models, serializers
from backend.static import error_codes
from backend.api.errors import CustomError


class RecordPermissionViewSet(viewsets.ModelViewSet):
    queryset = models.RecordDocumentTag.objects.all()
    serializer_class = serializers.RecordDocumentTagSerializer


class RecordPermissionRequestViewSet(APIView):
    def post(self, request, id):
        try:
            record = models.Record.objects.get(pk=id)
        except Exception as e:
            raise CustomError(error_codes.ERROR__RECORD__RECORD__NOT_EXISTING)
        if record.user_has_permission(request.user):
            raise CustomError(error_codes.ERROR__RECORD__PERMISSION__ALREADY_WORKING_ON)
        permission = models.RecordPermission(request_from=request.user, record=record)
