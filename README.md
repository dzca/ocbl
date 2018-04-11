# ocbl
ocbl.ca mobile application, prototype for google oauth2 implementation

## Installation
system requirement:
- ubuntu 16.04 LTS
- redis
- mysql server with database: mankey, tiger
- nodejs
- python

### Tiger UI installation
```
cd tiger-ui
npm install
npm start
```

### Tiger installation
```
cd tiger
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 5100
```

### mankey installation
```
cd mankey
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 4100
```

### authd installation
update conf.js in directory authd to enter google api client id and password
```
npm install
npm start
```

## Screenshot of the running app
![Screenshot](/images/tiger-schedule.png)

## System Architect
- Tiger-ui: the vuejs front application, user can access the application via cellphone
- authd: the nodejs server to interact with google oauth2 api, for user to do simple sign on
- mankey: the centralized server to manage jwt tokens and applications that the user has login
- tiger: a restful server to manage notices and schedules for a sports team.


![System diagram](/images/ocbl-sso-architect.jpg)

## API call sequence diagram
![API call sequence diagram](/images/sso-sequence.jpg)
