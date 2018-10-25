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


class ClientsViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = models.Client.objects.all()
    serializer_class = serializers.ClientSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        country = models.OriginCountry.objects.get(id=self.request.data['origin_country'])
        serializer.save(origin_country=country)


class GetClientsFromBirthday(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        clients = models.Client.objects.filter(birthday=request.data['birthday'])
        return Response(serializers.ClientSerializer(clients, many=True).data)
