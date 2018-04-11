"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from rbac.views import AccountViewSet, RoleViewSet, account_sync

# schedule
from schedule.views import SeasonViewSet, SessionViewSet, get_current_season
# account
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'account', AccountViewSet)
router.register(r'role', RoleViewSet)
router.register(r'season', SeasonViewSet)
router.register(r'session', SessionViewSet)
# router.register(r'github', GithubViewSet)

# contents
from content.views import ContentViewSet
api_content_list = ContentViewSet.as_view({'get': 'list'})
api_content_detail = ContentViewSet.as_view({'get': 'detail'})

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # schedule
    url(r'^rest/schedule',get_current_season),
    
    # account
    url(r'^account/sync', account_sync),
    
    # contents
    url(r'^api/notice', api_content_list, name='api_content_list'),
    url(r'^api/page/(?P<slug>[^/]+)$', api_content_detail, name = 'api_content_detail'),
    
    url(r'^api/', include(router.urls)),
]

# from app import settings
# 
# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns = [
#         url(r'^__debug__/', include(debug_toolbar.urls)),
#     ] + urlpatterns