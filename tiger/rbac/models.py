from __future__ import unicode_literals

from django.db import models
import uuid
from datetime import datetime
from django.utils import timezone
class AccountStatus:
    VISITOR = 'v'
    PENDING_APPROVE = 'p'
    APPROVED_USER = 'u'
    
    STATUS = (
        (VISITOR,  'visitor'),
        (PENDING_APPROVE, 'pending approve'),
        (APPROVED_USER, 'approved user'),
    )

class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=32, blank=True, unique=True, null=False)
    created = models.DateTimeField(auto_now_add=True, editable = True)
    
    def __unicode__(self):
        return '{0}'.format(self.name)

    class Meta:
        db_table = 'role'

class Account(models.Model):
    id = models.CharField(max_length=64, primary_key=True, verbose_name=u"Activation key", default=uuid.uuid4)
    name = models.CharField(max_length=32, blank=True, default='visitor', null=False)
    email = models.EmailField(unique=True, null=False)
    
    roles = models.ManyToManyField(Role, through='AccountRole',
        through_fields=('account', 'role', ),)
    
    status = models.CharField(max_length=2,
                                      choices=AccountStatus.STATUS,
                                      default='v')
    
    created = models.DateTimeField(auto_now_add=True, editable = True)
     
    def __unicode__(self):
        return '{0} - {1}'.format(self.email, self.name)
    
    class Meta:
        db_table = 'account'
        
class AccountRole(models.Model):
    id = models.CharField(max_length=64, primary_key=True, verbose_name=u"Activation key",
                 default=uuid.uuid4)
    
    account = models.ForeignKey(Account, null=True, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, null=True, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, editable = True)
    
    class Meta:
        db_table = 'account_role'
        ordering = ['account__email']