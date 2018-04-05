from django.shortcuts import render

from django.http.response import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from serializers import AccountSerializer, RoleSerializer
from models import Account, Role
from django.conf import settings

import logging
log = logging.getLogger(__name__)

@api_view(['POST'])
def account_sync(request):
    """
    API end point to sync the account that signed in via oauth.
    This API is called by [mankey] service. Logic:
    If account exists in database, fetch account + role and return
    if account does not exist, save the email into database as a visitor.
         
    sample request.data:    
    {
    "name": "Tayler",
    "email": "tayler@abc.ca",
    "token":"AABBCC",
    }
    """

    account = request.data 
    email = account.get('email')
    name = account.get('name')

    log.debug(' account_sync get request.data, receive account={0}, type={1}'.format(account, type(account) ))
    
    user = {}
    # check account by email
    if account_exists(email):
        user = Account.objects.get(email=email)
    else:
        user = Account(name=name, email=email, status='v')
        user.save()
    
    serializer = AccountSerializer(user)

    return Response(serializer.data)

def account_exists(email):
    num_of_account = Account.objects.filter(email = email).count()
    return num_of_account > 0

class AccountViewSet(viewsets.ModelViewSet):
    """
    API end point that allows account to be viewed or edited.
    """
    queryset = Account.objects.all().order_by('-created')
    queryset = AccountSerializer.setup_eager_loading(queryset)

    serializer_class = AccountSerializer

class RoleViewSet(viewsets.ModelViewSet):
    """
    API end point that allows role to be viewed or edited.
    """
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
