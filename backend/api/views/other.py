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

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from ..other_functions.emails import EmailSender
from ..models.rlc import Rlc
from ..serializers.rlc import RlcOnlyNameSerializer

class SendEmailViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        email = request.data['email']
        EmailSender.send_email_notification([email], 'SYSTEM NOTIFICATION', 'There was a change')
        return Response()


class GetRlcsViewSet(APIView):
    def get(self, request):
        rlcs = Rlc.objects.all()
        serialized = RlcOnlyNameSerializer(rlcs, many=True).data
        return Response(serialized)

