from django.contrib import admin

from models import App

class AppAdmin(admin.ModelAdmin):
    model = App
    list_filter = ['service_host', ]
    list_display = ['name','service_host','service_host', 'redirect_uri']

admin.site.register(App, AppAdmin)
