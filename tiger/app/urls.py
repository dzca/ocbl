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
# , SeasonViewSet, TeamViewSet, github_callback

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'account', AccountViewSet)
router.register(r'role', RoleViewSet)
# router.register(r'seasons', SeasonViewSet)
# router.register(r'teams', TeamViewSet)
# router.register(r'github', GithubViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^account/sync', account_sync),
]

# from app import settings
# 
# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns = [
#         url(r'^__debug__/', include(debug_toolbar.urls)),
#     ] + urlpatterns