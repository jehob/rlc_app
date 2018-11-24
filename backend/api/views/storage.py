#  rlcapp - record and organization management software for refugee law clinics
#  Copyright (C) 2018  Dominik Walser
#
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU Affero General Public License as
#  published by the Free Software Foundation, either version 3 of the
#  License, or (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU Affero General Public License for more details.
#
#  You should have received a copy of the GNU Affero General Public License
#  along with this program.  If not, see <https://www.gnu.org/licenses/>

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.recordmanagement.models import Record
from backend.static.error_codes import *
from backend.shared.storage_generator import generate_presigned_post, generate_presigned_url
from backend.static.storage_folders import is_storage_folder_of_record, user_has_permission


class StorageUploadViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """
        used for generating one presigned post, which can then be used to upload ONE file to amazon S3
        :param request: in the params should be defined: file_name, file_type and file_dir
        :return: the presigend post data
        """
        file_name = request.query_params.get('file_name')
        file_type = request.query_params.get('file_type')
        file_dir = request.query_params.get('file_dir', '')
        return generate_presigned_post(file_name, file_type, file_dir)

    def post(self, request):
        """
        used for generating multiple presigned posts and returning them as one object
        can used for uploading multiple files at once
        :param request:
        :return:
        """
        file_dir = request.data['file_dir']
        file_names = request.data['file_names']
        file_types = request.data['file_types']
        if file_names.__len__() != file_types.__len__():
            return Response(ERROR__RECORD__UPLOAD__NAMES_TYPES_LENGTH_MISMATCH)

        if not user_has_permission(file_dir, request.user):
            return Response(ERROR__API__PERMISSION__INSUFFICIENT)

        posts = []
        for i in range(file_names.__len__()):
            new_post = generate_presigned_post(file_names[i], file_types[i], file_dir)
            posts.append(new_post)
        return Response({'presigned_posts': posts})


class StorageDownloadViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        file_key = request.query_params.get('file', '')
        file_dir = file_key[:file_key.rfind('/')]
        if not user_has_permission(file_dir, request.user):
            return Response(ERROR__API__PERMISSION__INSUFFICIENT)

        return Response(generate_presigned_url(file_key))

    # def get(self, request):
    #     s3_bucket = settings.AWS_S3_BUCKET_NAME
    #     filekey = request.query_params.get('file', '')
    #     if filekey == '':
    #         return Response(ERROR__API__DOWNLOAD__NO_FILE_SPECIFIED, status=status.HTTP_400_BAD_REQUEST)
    #
    #     session = boto3.session.Session(region_name=settings.AWS_S3_REGION_NAME)
    #     s3 = session.client('s3', config=Config(signature_version='s3v4'))
    #     try:
    #         s3.get_object(Bucket=s3_bucket, Key=filekey)
    #     except Exception as ex:
    #         return Response(ERROR__API__DOWNLOAD__NO_SUCH_KEY, status=status.HTTP_400_BAD_REQUEST)
    #
    #     presigned_url = s3.generate_presigned_url(ClientMethod='get_object',
    #                                               Params={'Bucket': s3_bucket, 'Key': filekey},
    #                                               ExpiresIn=100)
    #     return Response({
    #         'data': presigned_url
    #     })
