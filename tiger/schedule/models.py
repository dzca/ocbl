from __future__ import unicode_literals

from django.db import models
from datetime import date
import uuid

class Season(models.Model):
    id = models.CharField(max_length=64, primary_key=True, verbose_name=u"Activation key", default=uuid.uuid4)
    name = models.CharField(max_length=64, blank=True, null=True)
    school = models.CharField(max_length=128, blank=True, null=True)
    address = models.CharField(max_length=128, blank=True, null=True)
    start_date = models.DateField(blank=False, null=False)
    end_date = models.DateField(blank=False, null=False)
    
    class Meta:
        db_table = 'season'
        ordering = ['-start_date']
        
    def __unicode__(self):
        return self.name
    
    def is_current(self):
        current_date = date.today()
        if current_date >= self.start_date and current_date <= self.end_date:
            return True
        else:
            return False
        
    def year(self):
        return self.start_date.strftime('%Y')
    
class Session(models.Model):
    id = models.CharField(max_length=64, primary_key=True, verbose_name=u"Activation key", default=uuid.uuid4)
    season = models.ForeignKey(Season, related_name='sessions', null=True, on_delete=models.CASCADE)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'session'
        ordering = ['start_time']
        
    def __unicode__(self):
        return 'Session'

    def week_day(self):
        return self.start_time.strftime('%A')
    
    def date(self):
        # '%Y-%m-%d %H:%M'
        return self.start_time.strftime('%Y-%m-%d')
    
    def session_time(self):
        start_at = self.start_time.strftime('%H:%M')
        end_at = self.end_time.strftime('%H:%M')
        return start_at + ' - ' + end_at