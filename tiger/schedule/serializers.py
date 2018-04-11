from rest_framework import serializers

from models import Season, Session

class SessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Session
        fields = ('id','week_day', 'date', 'session_time')
        
class SeasonSerializer(serializers.ModelSerializer):
    sessions = SessionSerializer(many=True, read_only=True)
    
    @staticmethod
    def setup_eager_loading(queryset):
        """ Perform necessary eager loading of data. """
        queryset = queryset.prefetch_related('sessions')
        return queryset
    
    class Meta:
        model = Season
        fields = ('id', 'name','school','address','year','sessions')
        


