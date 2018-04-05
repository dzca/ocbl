from __future__ import unicode_literals

from django.db import models
import uuid

class App(models.Model):
    id = models.CharField(max_length=64, primary_key=True, verbose_name=u"Activation key", default=uuid.uuid4)
    name = models.CharField(max_length=32, blank=True, unique=True, null=False)
    service_host = models.CharField(max_length=32, blank=True, null=False)
    ui_host = models.CharField(max_length=32, blank=True, null=False)
    redirect_uri =  models.CharField(max_length=200, blank=True, null=False)
    
    def __unicode__(self):
        return '{0}'.format(self.name)
    
    class Meta:
        db_table = 'app'
        
# class AuthProvider(models.Model):
#     id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=32, blank=True, unique=True, null=False)
#     icon_uri = models.CharField(max_length=32, blank=True, null=False)
#     
#     
#     def __unicode__(self):
#         return '{0}'.format(self.name)
#         
#     class Meta:
#         db_table = 'auth_provider'