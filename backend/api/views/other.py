from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from ..other_functions.emails import EmailSender


class SendEmailViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        email = request.data['email']
        EmailSender.send_email_notification([email], 'SYSTEM NOTIFICATION', 'There was a change')
        return Response()
