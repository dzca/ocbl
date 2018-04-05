## github mockup server

This server emulates github api, for develop oauth2 from local machine

The design idea come form the article listed below:
a very good explain for oauth2 login
https://www.jianshu.com/p/1c48ec65936b

### server info
- HTTP port 3001
- HTTPS port 4001

### The API to emulate:
[1] API to fetch token (/api/access_token?code=xyz)
POST
https://github.com/login/oauth/access_token += '?code='+ code;1

This API returns an access token
code=2we -> token=AABBCC

[2] API to fetch an user info (/api/user?access_token=AABBCC)
GET https://api.github.com/user?access_token="+token+"&scope=user"


nodemon server.js
nodemon ./server.js localhost 8080
