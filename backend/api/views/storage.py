from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from django.http import HttpResponse
import os
import boto3
import json
from botocore.client import Config

from backend.recordmanagement import models, serializers
from backend.api.models import UserProfile
from backend.api.other_functions.emails import EmailSender
from backend.static.permissions import PERMISSION_VIEW_RECORDS_FULL_DETAIL


class StorageViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        S3_BUCKET = os.environ.get('S3_BUCKET')
        file_name = request.query_params.get('file_name')
        file_type = request.query_params.get('file_type')

        session = boto3.session.Session(region_name=os.environ.get('AWS_S3_REGION_NAME'))
        s3 = session.client('s3', aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
                          aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'))


        b = s3.list_objects_v2(Bucket=S3_BUCKET, Prefix='uploads')

        presigned_post = s3.generate_presigned_post(
            Bucket=S3_BUCKET,
            Key='uploads/' + file_name,
            Fields={"acl": "private", "Content-Type": file_type},
            ExpiresIn=3600
        )
        data = json.dumps({
            'data': presigned_post,
            'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, file_name)
        })
        # return HttpResponse(data, content_type='json')
        return Response({
            'data': presigned_post,
            'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, file_name)
        })


class StorageDownloadViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        S3_BUCKET = os.environ.get('S3_BUCKET')
        filekey = 'uploads/WorkshopTeilnehmer.txt'
        a = os.environ.get('AWS_S3_REGION_NAME')
        session = boto3.session.Session(region_name=os.environ.get('AWS_S3_REGION_NAME'))
        s3 = session.client('s3', aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
                            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
                            config=Config(signature_version='s3v4'))
        s3 = session.client('s3', config=Config(signature_version='s3v4'))

        # s3Client.generate_presigned_url('get_object', Params = {'Bucket': 'www.mybucket.com', 'Key': 'hello.txt'}, ExpiresIn = 100)

        presigned_url = s3.generate_presigned_url(ClientMethod='get_object',
                                                  Params={'Bucket': 'rlc-intranet-files', 'Key': filekey},
                                                  ExpiresIn=100)
        return Response({
            'data': presigned_url
        })
