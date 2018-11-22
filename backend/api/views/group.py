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

from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .. import models, serializers


class GroupViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = models.Group.objects.all()
    serializer_class = serializers.GroupSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        creator = models.UserProfile.objects.get(id=self.request.user.id)
        serializer.save(creator=creator)

    def partial_update(self, request, *args, **kwargs):
        a = 10


class GroupTestViewSet(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        queryset = models.Group.objects.all()
        serializer = serializers.GroupSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        pass

    def retrieve(self, request, pk=None):
        queryset = models.Group.objects.all()
        serializer = serializers.GroupSerializer(queryset, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):

        pass

    def destroy(self, request, pk=None):
        pass
