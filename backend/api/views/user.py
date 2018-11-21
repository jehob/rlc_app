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
from rest_framework import status

from ..models import UserProfile, Permission, Rlc
from ..serializers import UserProfileSerializer, UserProfileCreatorSerializer, UserProfileNameSerializer
from ..permissions import UpdateOwnProfile
from backend.static.error_codes import *


class UserProfileViewSet(viewsets.ModelViewSet):
    """Handles creating (for now, remove?), reading and updating profiles"""

    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (UpdateOwnProfile, IsAuthenticated)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)

    def list(self, request, *args, **kwargs):
        if request.user.is_superuser:
            queryset = UserProfile.objects.all()
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            queryset = UserProfile.objects.filter(rlc=request.user.rlc)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = UserProfileNameSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = UserProfileNameSerializer(queryset, many=True)
            return Response(serializer.data)


class UserProfileCreatorViewSet(viewsets.ModelViewSet):
    """Handles creating profiles"""
    serializer_class = UserProfileCreatorSerializer
    queryset = UserProfile.objects.none()

    def create(self, request):
        data = dict(request.data)
        del data['rlc']
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        user = UserProfile.objects.get(email=request.data['email'])
        user.rlc = Rlc.objects.get(pk=request.data['rlc'])
        if 'birthday' in request.data:
            user.birthday = request.data['birthday']
        user.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


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
                    return Response(ERROR__API__LOGIN__WRONG_PASSWORD,
                                    status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response(ERROR__API__LOGIN__NO_ACCOUNT,
                                    status=status.HTTP_400_BAD_REQUEST)
        return Response(LoginViewSet.get_login_data(token.data['token']))

    def get(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split(' ')[1]
        return Response(LoginViewSet.get_login_data(token))

    @staticmethod
    def get_login_data(token):
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
        overall_permissions = [model_to_dict(permission) for permission in Permission.objects.all()]

        return {
            'permissions': user_permissions,
            'all_permissions': overall_permissions
        }
