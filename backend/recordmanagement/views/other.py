from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from . import serializers
from ..models import Record
from rest_framework.response import Response


class RetrieveRecordViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, id):
        record = Record.objects.get(pk=id)
        user = request.user
        if user.rlc_members.first() != record.from_rlc and not user.is_superuser:
            return Response({'error': 'wrong rlc', 'error_token': 'api.retrieve_record.wrong_rlc'}, status=400)

        if user.working_on_record.filter(id=id).count() == 1:
            record_serializer = serializers.RecordFullDetailSerializer(record)
            client_serializer = serializers.ClientSerializer(record.client)
            origin_country = serializers.OriginCountrySerializer(record.client.origin_country)

            return Response({
                'record': record_serializer.data,
                'client': client_serializer.data,
                'origin_country': origin_country.data
            })
        else:
            serializer = serializers.RecordNoDetailSerializer(record)
            return Response(serializer.data)

