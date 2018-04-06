from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from django.core.cache import cache
from django.conf import settings
import json

import logging
log = logging.getLogger(__name__)

# library to send requests to other services
import requests

# json web token
import uuid
from jose import jwt

from models import App

@api_view(['GET'])
def build_jwt_token(request, app):
    '''
    Generate JWT token with random numbers
    '''
    id = str(uuid.uuid4())
    app = 'tiger'
    jwt_token = jwt.encode({'id': id, 'app':app}, settings.JWT_SECRET,  algorithm='HS256')
    log.debug('generate jwt token app={0}'.format(app))
    return Response({ 'jwt_token' : jwt_token})
    
@api_view(['POST'])
def sync_oauth_token(request):
    """
    API end point to sync the account that signed in via oauth.
    This API is called by [authd] node service to manage user-token table in redis 
    and users database 
    
    Logic:
    lookup account from database and insert token->account pair into redis
    
    sample request.data:    
    {
    u'token': u'ya29.Glui', 
    u'email': u'dike.zhang@gmail.com', 
    u'name': u'Dustin Zhang'
    }

    """
    account = request.data
    log.debug('login, receive account={0}'.format(account))
    
    jwt_token = account.get('token')
    # decode app from jwt_token
    dict_payload = jwt.decode(jwt_token, settings.JWT_SECRET, algorithms='HS256')
    app = dict_payload.get('app')
    str_user = sync_account(account, app)
    cache.set(jwt_token, str_user, settings.REDIS_TOKEN_TIMEOUT_SEC)
    
    return Response({ 'user' : str_user})

def sync_account(account, app):
    '''
    call call [app]/account/sync to get (new or existing) account,
    return json string {account, role }
    '''
    res = requests.post(get_account_sync_url(app), account)
    # return user as json string
    str_user = res.text
    
    log.debug('query account from app={0}, return user type={1}'.format(app, str_user))
    return str_user

def get_account_sync_url(app):
    application  = App.objects.get(name=app)
    url = application.service_host + '/account/sync'
    log.debug('login, prepare url={0}'.format(url))
    return url

def get_user_from_cache(key):
    '''
    Lookup user in redis cache
    return user string  if user exists,  null otherwise 
    '''
    
    log.debug('lookup user in redis with key ={0}'.format(key))
    str_user= cache.get(key)

    if not str_user:
        return None
    else:
        return str_user

@api_view(['GET'])
def query_user(request):
    """
    fetch account from redis, token in HTTP Header [Authorization]
    if hit: 
        return account as json string
    else:
        return 401 and error_msg. UI jump to Home and show error message
    """
    token = request.META.get('HTTP_AUTHORIZATION')
    
    log.info('query_user HTTP header, receive token={0}'.format(token))
    
    str_user = get_user_from_cache(token)
    return Response({ 'user' : str_user})