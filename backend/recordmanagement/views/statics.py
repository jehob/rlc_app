from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from backend.api.serializers import UserProfileNameSerializer
from ..serializers import RecordTagNameSerializer, OriginCountryNameStateSerializer
from ..models import RecordTag, OriginCountry, Record


class StaticViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user

        if user.rlc_members.count() == 0:
            consultants = []
        else:
            consultants = UserProfileNameSerializer(user.rlc_members.first().get_consultants(), many=True).data

        record_tags = RecordTagNameSerializer(RecordTag.objects.all(), many=True).data
        countries = OriginCountryNameStateSerializer(OriginCountry.objects.all(), many=True).data

        states_for_records = Record.record_states_possible
        states_for_countries = OriginCountry.origin_country_states_possible

        return Response({
            'record_tags': record_tags,
            'consultants': consultants,
            'countries': countries,
            'record_states': states_for_records,
            'country_states': states_for_countries
        })
