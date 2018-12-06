
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from backend.recordmanagement import models, serializers
from backend.static import error_codes
from backend.api.errors import CustomError
from backend.static.permissions import PERMISSION_CAN_PERMIT_RECORD_PERMISSION_REQUESTS


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

        if models.RecordPermission.objects.filter(record=record, request_from=request.user).count() >= 1:
            raise CustomError(error_codes.ERROR__RECORD__PERMISSION__ALREADY_REQUESTED)

        can_edit = False
        if 'can_edit' in request.data:
            can_edit = request.data['can_edit']

        permission = models.RecordPermission(request_from=request.user, record=record, can_edit=can_edit)
        permission.save()
        return Response(serializers.RecordPermissionSerializer(permission).data)


class RecordPermissionAdmitViewSet(APIView):
    def get(self, request):
        user = request.user
        if not user.has_permission(PERMISSION_CAN_PERMIT_RECORD_PERMISSION_REQUESTS, for_rlc=user.rlc):
            return CustomError(error_codes.ERROR__API__PERMISSION__INSUFFICIENT)
        requests = models.RecordPermission.objects.filter(record__from_rlc=user.rlc)
        return Response(serializers.RecordPermissionSerializer(requests, many=True).data)

    def post(self, request):
        pass
