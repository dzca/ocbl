from __future__ import unicode_literals

from django.db import models
import uuid
from datetime import datetime 
from django.template.defaultfilters import slugify
from django.db.models import permalink

class ContentType:
    NOTICE = 'n'
    PAGE = 'p'
    
    TYPE = (
        (NOTICE,  'notice'),
        (PAGE, 'page'),
    )
    
class Content(models.Model):
    id = models.CharField(max_length=64, primary_key=True, verbose_name=u"Activation key",
                 default=uuid.uuid4)
    
    title = models.CharField(max_length=250, unique=True)
    slug = models.SlugField(max_length=250, unique=True)
    body = models.TextField()
    hits = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    
    content_type = models.CharField(max_length=2,
                                      choices=ContentType.TYPE,
                                      default='n')
    
    created_at = models.DateTimeField(default=datetime.now, db_index=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __unicode__(self):
        return self.title
    
    class Meta:
        db_table = 'content'
        ordering = ['-created_at']
        
    @permalink
    def get_absolute_url(self):
        return ('view_blog_post', None, { 'slug': self.slug })
    
    def create_date(self):
        # '%Y-%m-%d %H:%M'
        return self.created_at.strftime('%Y-%m-%d')
