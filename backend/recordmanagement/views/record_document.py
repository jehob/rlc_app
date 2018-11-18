""" rlcapp - record and organization management software for refugee law clinics
Copyright (C) 2018  Dominik Walser

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/> """
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


from backend.recordmanagement import models, serializers
from backend.shared import storage_generator
from backend.static import error_codes, storage_folders


class RecordDocumentViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = models.RecordDocument.objects.all()
    serializer_class = serializers.RecordDocumentSerializer
    permission_classes = (IsAuthenticated, )

# def get(self, request):
#     file_name = request.query_params.get('file_name')
#     file_type = request.query_params.get('file_type')
#     file_dir = request.query_params.get('file_dir', '')
#     return generate_presigned_post(file_name, file_type, file_dir)


class RecordDocumentUploadViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, id):
        record = models.Record.objects.get(pk=id)
        if record is None:
            return Response(error_codes.ERROR__RECORD__RECORD__NOT_EXISTING)

        file_dir = storage_folders.get_storage_folder_record_document(record.from_rlc_id, record.id)
        file_name = request.query_params.get('file_name', '')
        file_type = request.query_params.get('file_type', '')

        return storage_generator.generate_presigned_post(file_name, file_type, file_dir)

    def post(self, request):
        pass
