from django.contrib import admin

from models import Account, Role, AccountRole

class AccountAdmin(admin.ModelAdmin):
    model = Account
    list_display = ['id', 'name', 'email', ]
    
class RoleAdmin(admin.ModelAdmin):
    model = Role
    list_display = ['id', 'name']

class AccountRoleAdmin(admin.ModelAdmin):
    model = AccountRole
    list_filter = ['account']
    list_display = ['id', 'account', 'role']
    
admin.site.register(Account, AccountAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(AccountRole, AccountRoleAdmin)