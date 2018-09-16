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

from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from . import views
from ..recordmanagement import urls

router = DefaultRouter()
router.register('profiles', views.user.UserProfileViewSet)
router.register('login', views.LoginViewSet, base_name='login')
router.register('clients', views.ClientsViewSet)
router.register('create_profile', views.UserProfileCreatorViewSet,
                base_name='create_profile')
router.register('groups', views.GroupViewSet, base_name='groups')
router.register('groups_test', views.GroupTestViewSet, base_name='groups_test')
router.register('permissions', views.PermissionViewSet, base_name='permissions')
router.register('has_permission', views.HasPermissionViewSet, base_name="has_permission")
router.register('rlcs', views.RlcViewSet, base_name='rlcs')
router.register('get_statics', views.GetStaticsViewSet, base_name='get_statics')

urlpatterns = [
  url(r'', include(router.urls)),
  url(r'^records/', include(urls))
]
