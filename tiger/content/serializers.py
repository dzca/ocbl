from models import Content
from rest_framework import serializers
        
class ContentSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Content
        fields = ('id', 'title', 'body', 'slug','hits', 'create_date')


