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
from rest_framework import permissions
from .statics import StaticPermissionNames as static


# TODO: what to do with this?? custom permissions? 
class UpdateOwnProfile(permissions.BasePermission):
    """allow users to edit their own profile"""

    def has_object_permission(self, request, view, obj):
        """check user is trying to edit their own profile"""

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.id == request.user.id or request.user.is_staff


class EditRecord(permissions.BasePermission):
    def has_permission(self, request, view):
        return True


class TestIt(permissions.BasePermission):
    def has_permission(self, request, view):
        a = request.method
        return True


class OnlySuperuser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser


class EditPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        return request.user.is_superuser


class OriginCountry(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        if request.method == 'GET':
            return True
        elif request.method == 'POST':
            return request.user.has_permission(static.CAN_ADD_ORIGIN_COUNTRY)
        else:
            return False