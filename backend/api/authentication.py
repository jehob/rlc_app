from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token
from datetime import datetime
import pytz
from django.conf import settings


class ExpiringTokenAuthentication(TokenAuthentication):
    model = Token

    def authenticate_credentials(self, key):
        try:
            token = Token.objects.get(key=key)
        except self.model.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        if not token.user.is_active:
            raise AuthenticationFailed('User inactive or deleted')

        utc_now = datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.timezone(settings.TIME_ZONE))

        if token.created < utc_now - settings.TIMEOUT_TIMEDELTA:
            token.delete()
            raise AuthenticationFailed('Token has expired')

        token.created = datetime.utcnow().replace(tzinfo=pytz.timezone(settings.TIME_ZONE))
        token.save()
        return token.user, token


