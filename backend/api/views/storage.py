from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import os
import boto3
from botocore.client import Config
from rest_framework.parsers import MultiPartParser


class StorageUploadViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser,)

    def get(self, request):
        S3_BUCKET = os.environ.get('S3_BUCKET')
        file_name = request.query_params.get('file_name')
        file_type = request.query_params.get('file_type')

        file_dir = request.query_params.get('file_dir', '')
        if file_dir != '' and not file_dir.endswith('/'):
            file_dir = file_dir + "/"

        session = boto3.session.Session(region_name=os.environ.get('AWS_S3_REGION_NAME'))
        s3 = session.client('s3', aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
                            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'))

        b = s3.list_objects_v2(Bucket=S3_BUCKET, Prefix='uploads')

        presigned_post = s3.generate_presigned_post(
            Bucket=S3_BUCKET,
            Key=file_dir + file_name,
            Fields={"acl": "private", "Content-Type": file_type},
            ExpiresIn=3600
        )
        return Response({
            'data': presigned_post,
            'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, file_name)
        })

    def post(self, request):
        if 'file' not in request.data:
            return Response({
                'error': 'no file to upload',
                'error_code': 'api.upload.no_file'
            })
        file_obj = request.data['file']
        file_dir = request.data['file_dir']
        if file_dir != '' and not file_dir.endswith('/'):
            file_dir = file_dir + "/"
        # TODO: check if profile picture, when yes, compress with pillow and upload one bigger picture and one small icon like
        pass


class StorageDownloadViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        s3_bucket = os.environ.get('S3_BUCKET')
        filekey = request.query_params.get('file', '')
        if filekey == '':
            return Response({
                'error': 'no file specified',
                'error_code': 'api.download.no_file_specified'
            })

        session = boto3.session.Session(region_name=os.environ.get('AWS_S3_REGION_NAME'))
        s3 = session.client('s3', config=Config(signature_version='s3v4'))
        try:
            s3.get_object(Bucket=s3_bucket, Key=filekey)
        except Exception as ex:
            return Response({'error': "no such key", 'error_code': "api.download.no_such_key"})

        presigned_url = s3.generate_presigned_url(ClientMethod='get_object',
                                                  Params={'Bucket': s3_bucket, 'Key': filekey},
                                                  ExpiresIn=100)
        return Response({
            'data': presigned_url
        })
