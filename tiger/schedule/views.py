from django.shortcuts import render

from serializers import SeasonSerializer, SessionSerializer
from models import Season, Session
from django.conf import settings

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from datetime import datetime
from models import Season, Session

@api_view(['GET'])
def get_current_season(request):
    """
    API end point to get current season

    return  session(Date    Week Day    Time) -{ 2017-09-19    Tuesday    20:00 - 22:00}
    """

    # find current date
    today = datetime.now()

    # find the Season, start date <= today and end date >= today
    seasons = Season.objects.filter(start_date__lte=today, end_date__gte=today)
    if seasons:
        current_season = seasons[0]

    else:
        current_season = None
        sessions = []

    serializer = SeasonSerializer(current_season)

    return Response(serializer.data)

class SeasonViewSet(viewsets.ModelViewSet):
    """
    API end point that allows account to be viewed or edited.
    """
    queryset = Season.objects.all().order_by('-start_date')
    queryset = SeasonSerializer.setup_eager_loading(queryset)

    serializer_class = SeasonSerializer

class SessionViewSet(viewsets.ModelViewSet):
    """
    API end point that allows role to be viewed or edited.
    """
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
