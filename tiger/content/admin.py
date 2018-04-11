from django.contrib import admin

from models import Content

class ContentAdmin(admin.ModelAdmin):
    model = Content
    prepopulated_fields = {"slug": ("title",)}
    list_display = ['id','title','body','slug','hits', 'created_at']

admin.site.register(Content, ContentAdmin)