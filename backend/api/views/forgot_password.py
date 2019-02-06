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

from rest_framework.views import APIView
from rest_framework.response import Response

from backend.api.errors import CustomError
from backend.static.error_codes import *
from ..models import UserProfile, ForgotPasswordLinks
from ..serializers import ForgotPasswordSerializer


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[-1].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


class ResetPasswordViewSet(APIView):
    def post(self, request):
        if 'email' in request.data:
            email = request.data['email']
        else:
            raise CustomError(ERROR__API__EMAIL__NO_EMAIL_PROVIDED)
        try:
            user = UserProfile.objects.get(email=email)
        except:
            raise CustomError(ERROR__API__EMAIL__NO_EMAIL_PROVIDED)

        ip = get_client_ip(request)

        user.is_active = False
        forgot_password_link = ForgotPasswordLinks(user=user)
        #forgot_password_link.save()
        return Response(ForgotPasswordSerializer(forgot_password_link).data)

