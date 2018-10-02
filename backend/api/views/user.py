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
from rest_framework import viewsets, filters
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.forms.models import model_to_dict

from ..models import UserProfile, Permission
from ..serializers import UserProfileSerializer, UserProfileCreatorSerializer, UserProfileNameSerializer
from ..permissions import UpdateOwnProfile
from backend.recordmanagement import models, serializers


class UserProfileViewSet(viewsets.ModelViewSet):
    """Handles creating (for now, remove?), reading and updating profiles"""

    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (UpdateOwnProfile, IsAuthenticated)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)


class UserProfileCreatorViewSet(viewsets.ModelViewSet):
    """Handles creating profiles"""
    serializer_class = UserProfileCreatorSerializer
    queryset = UserProfile.objects.none()


class LoginViewSet(viewsets.ViewSet):
    """checks email and password and returns auth token"""
    serializer_class = AuthTokenSerializer

    def create(self, request):
        """
        use the obtainauthToken APIView to validate and create a token
        additionally add all important information for app usage
        like static possible states, possible permissions and so on
        Args:
            request: the request with data: 'username' and 'password"

        Returns:
        token, information and permissions of user
        all possible permissions, country states, countries, clients, record states, consultants
        """
        try:
            token = ObtainAuthToken().post(request)
        except Exception as ex:
            if ex.detail['non_field_errors'][0] == 'Unable to log in with provided credentials.':
                if UserProfile.objects.filter(email=request.data['username']).count() == 1:
                    return Response({'error': 'wrong password'}, status=400)
                else:
                    return Response({'error': 'there is no account with this email'}, status=400)
        return Response(LoginViewSet.getLoginData(token.data['token']))

    def get(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split(' ')[1]
        return Response(LoginViewSet.getLoginData(token))

    @staticmethod
    def getLoginData(token):
        user = Token.objects.get(key=token).user
        serialized_user = UserProfileSerializer(user).data

        statics = LoginViewSet.get_statics(user)
        return_object = {
            'token': token,
            'user': serialized_user
        }
        return_object.update(statics)
        return return_object

    @staticmethod
    def get_statics(user):
        user_permissions = [model_to_dict(perm) for perm in user.get_overall_permissions()]

        states_for_records = models.Record.record_states_possible
        states_for_countries = models.OriginCountry.origin_country_states_possible

        overall_permissions = [model_to_dict(permission) for permission in Permission.objects.all()]
        if user.rlc_members.count() == 0:
            consultants = []
        else:
            consultants = UserProfileNameSerializer(user.rlc_members.first().get_consultants(),
                                                                many=True).data
        countries = serializers.OriginCountryNameStateSerializer(models.OriginCountry.objects.all(), many=True).data
        clients = serializers.ClientNameSerializer(models.Client.objects.all(), many=True).data

        tags = serializers.RecordTagNameSerializer(models.RecordTag.objects.all(), many=True).data
        return {
            'tags': tags,
            'permissions': user_permissions,
            'consultants': consultants,
            'clients': clients,
            'countries': countries,
            'all_permissions': overall_permissions,
            'record_states': states_for_records,
            'country_states': states_for_countries
        }
