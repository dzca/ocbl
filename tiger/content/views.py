from django.shortcuts import render

from models import Content
from rest_framework import viewsets
from rest_framework.response import Response
from serializers import ContentSerializer
    
class ContentViewSet(viewsets.ViewSet):

    def list(self, request, format=None):
        queryset = Content.objects.exclude(content_type='p').filter(published=True).order_by('-created_at')
        serializer = ContentSerializer(queryset, many=True)
        return Response(serializer.data)

    def detail(self, request, slug, format=None):
        # increment view each time
        content = Content.objects.get(slug=slug)
        content.hits +=1
        content.save()
        
        serializer = ContentSerializer(content, many=False)
        return Response(serializer.data)
