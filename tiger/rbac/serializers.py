from rest_framework import serializers

# from team.models import Team, Season

# class TeamSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Team
#         fields = ('id', 'name', 'city', 'created')
# 
# 
# class SeasonSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Season
#         fields = ('id', 'name', 'address', 'year', 'game_type', 'created')
            
from models import Account, Role


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name')
        
class AccountSerializer(serializers.ModelSerializer):
    roles = RoleSerializer(many=True, read_only=True)
    
    @staticmethod
    def setup_eager_loading(queryset):
        """ Perform necessary eager loading of data. """
        queryset = queryset.prefetch_related('roles')
        return queryset
    
    class Meta:
        model = Account
        fields = ('id', 'name', 'email','status', 'roles')

