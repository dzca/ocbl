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
#     app = 'tiger'
    log.debug('generate jwt token app={0}'.format(app))
    return Response({ 'jwt_token' : jwt_token})
    
@api_view(['POST'])
def sync_oauth_token(request):
    """
    API end point to sync the account that signed in via oauth.
    This API is called by [authd] node service to manage user-token table in redis 
    and users database 
    
    Logic:
    If account exists in redis, check token, update token if different, then return json {account, role }
    if account does not exist, 
        1) call [app]/account/sync to get {account, role }
        2) insert {account, role } by auth:[app]:email ->  {account, role, token }
        
     sample request.data:    
    {
    "name": "Tayler",
    "email": "tayler@abc.ca",
    "token":"AABBCC",
    "app":"tiger"
    }
    """

    account = request.data
    log.debug('login, receive account={0}'.format(account))
    
    token = account.get('token')
    email = account.get('email')
    app = account.get('app')
    
    key = app + ':' + email
    # lookup user in redis cache
    value = get_user_from_cache(key)
     
    if not value:
        # no match in redis, sync account via tiger service
        str_user = sync_account(account)
        log.debug('user {0} not in redis, load user from database str_user={1}'.format(email, str_user))
         
        # user token must be string
        json_user_token = { 'user': str_user, 'token': token}
        str_user_token = json.dumps(json_user_token)
        cache.set(key, str_user_token, settings.REDIS_TOKEN_TIMEOUT_SEC)
    else:
        # found in redis, convert string to json_user_token
        log.debug('found key in redis str_user={0}'.format(value))
        json_user_token = json.loads(value)
        str_user = json_user_token.get('user')
        str_token = json_user_token.get('token')
        # update token if changed
        if str_token != token:
            json_user_token['token'] = token
            str_user_token =  json.dumps(json_user_token)
            cache.set(token, str_user_token, settings.REDIS_TOKEN_TIMEOUT_SEC)
        else:
            str_user_token = value
         
        log.debug('email {0} in redis, load user={1}, type={2}'.format(account.get('email'), str_user, type(str_user)))
        
    return Response({ 'user_token' : str_user_token})

def sync_account(account):
    '''
    call call [app]/account/sync to sync account,
    return json string {account, role }
    '''
    app = account.get('app')
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
    str_user_token = cache.get(key)
             
    if not str_user_token:
        return None
    else:
        return str_user_token
    
@api_view(['POST'])
def query_user(request):
    """
    API end point to query token by email:app + token
    if hit: 
        return user object
    else:
        return 401 and error_msg. UI jump to Home and show error message
        
     sample request.data:    
    {
    "email": "tayler@abc.ca",
    "token":"AABBCC",
    "app": "tiger"
    }
    """
#     if request.method == 'POST':
#         return Response({"message": "Got some data!", "data": request.data})
    account = request.data
    log.info('login, receive account={0}, type={1}'.format(account, type(account)))
    return Response({"message": "Hello, world!"})