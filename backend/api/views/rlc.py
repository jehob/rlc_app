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

from ..models.rlc import Rlc
from ..models.user import UserProfile
from ..serializers.rlc import RlcSerializer


class RlcViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = Rlc.objects.all()
    serializer_class = RlcSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        creator = UserProfile.objects.get(id=self.request.user.id)
        serializer.save(creator=creator)


