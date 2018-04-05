django-admin startproject app
mv app auths
cd auths
python manage.py runserver 3100
python manage.py migrate
 python manage.py startapp oauth
 python manage.py createsuperuser
 
 N+1 problem
 http://ses4j.github.io/2015/11/23/optimizing-slow-django-rest-framework-performance/