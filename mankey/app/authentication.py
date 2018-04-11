# from django.contrib.oauth.models import User
from rest_framework import authentication
from rest_framework import exceptions

import logging
log = logging.getLogger(__name__)

import json, re

from django.core.cache import cache
from django.conf import settings


class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        path = request.path
        log.debug('TokenAuthentication get path = {0}'.format(path))

        #if path start with /rest/* pass it
        parser = re.compile(r'^/rest/(\w+/)+.*')
        match_group = parser.match(path)
        if match_group:
            return None

        token = request.META.get('HTTP_AUTHORIZATION')
        log.debug('TokenAuthentication get token = {0}'.format(token))
        if not token:
            raise exceptions.AuthenticationFailed('Authorization Token required')
        else:
            # lookup redis to see if token exists
            # if not, return exception, else return user
            value = cache.get(token)

            if value == None:
                # user = None
                raise exceptions.AuthenticationFailed('Invalid token in redis')
            else:
                user = json.loads(value)
                cache.set(token, json.dumps(user), settings.REDIS_TOKEN_TIMEOUT_SEC)

        return (user, None)
