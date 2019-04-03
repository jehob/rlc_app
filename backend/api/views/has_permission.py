#  rlcapp - record and organization management software for refugee law clinics
#  Copyright (C) 2019  Dominik Walser
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

from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.api.errors import CustomError
from backend.static import error_codes
from backend.static.permissions import PERMISSION_MANAGE_PERMISSIONS_RLC
from ..models.has_permission import HasPermission
from ..serializers.has_permission import HasPermissionSerializer


class HasPermissionViewSet(viewsets.ModelViewSet):
    queryset = HasPermission.objects.all()
    serializer_class = HasPermissionSerializer
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        pass

    def destroy(self, request, *args, **kwargs):
        if 'pk' not in kwargs:
            raise CustomError(error_codes.ERROR__API__HAS_PERMISSION__NO_ID_PROVIDED)
        try:
            hasPermission = HasPermission.objects.get(pk=kwargs['pk'])
        except:
            raise CustomError(error_codes.ERROR__API__HAS_PERMISSION__NOT_FOUND)

        user = request.user
        if not user.has_permission(PERMISSION_MANAGE_PERMISSIONS_RLC, for_rlc=user.rlc):
            return CustomError(error_codes.ERROR__API__PERMISSION__INSUFFICIENT)

        hasPermission.delete()
        return Response({'status': 'success'})

    # def create(self, request, *args, **kwargs) -> Response:
    #     if not request.user.has_permission(PERMISSION_MANAGE_PERMISSIONS_RLC, for_rlc=request.user.rlc):
    #         raise CustomError(error_codes.ERROR__API__PERMISSION__INSUFFICIENT)
    #
    #     a = 10
    #     pass

    def create(self, request, *args, **kwargs):
        if not request.user.has_permission(PERMISSION_MANAGE_PERMISSIONS_RLC, for_rlc=request.user.rlc):
            raise CustomError(error_codes.ERROR__API__PERMISSION__INSUFFICIENT)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
