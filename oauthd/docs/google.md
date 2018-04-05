server listening on port 3100

google auth callback example:
https://oa2cb.example.com/code?state=security_token%3D138r5719ru3e1%26url%3Dhttps://oa2cb.example.com/myHome&code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7

sample of result

tokens={"access_token":"ya29.GluOBWPYLEnAB15exIS6rRuta70r9UzpFLvEU1C5rYMpqusG9vWahlV6e-9gWsmHvQVnW-ERD8AQtCq3umnA8B8kWxFfMwSDIB3be3UtgbvMvAhKmJsvsFQX7Kkv","token_type":"Bearer","refresh_token":"1/kW-B085Aq9byGjYQ8FVOUuxUasv1mjB55Uxb_4w4_kHHYekEdWWCE26lGAXTBqAb","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImU5YjU2Y2ZjNjQwZDEyYmZmNDU0MDU1MzQwMmM3ZjE1N2Q0ODE4MDYifQ.eyJhenAiOiI4ODAyODI0NzA5ODktZHFxNzM3bDJucG85NGgxcjRyZjMzc3FsNTdobnA5Y2ouYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4ODAyODI0NzA5ODktZHFxNzM3bDJucG85NGgxcjRyZjMzc3FsNTdobnA5Y2ouYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ1Njk1MTgyNDczNDQ3ODE3NzYiLCJlbWFpbCI6ImRpa2UuemhhbmdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJJUVZvdnlnUUhEWS1OaVIzZWJsYWRRIiwiZXhwIjoxNTIyNDM1OTg2LCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJpYXQiOjE1MjI0MzIzODYsIm5hbWUiOiJEdXN0aW4gWmhhbmciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy0zamtOMlNnYXVFMC9BQUFBQUFBQUFBSS9BQUFBQUFBQUJHVS9XN0N3c21jdEJhWS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiRHVzdGluIiwiZmFtaWx5X25hbWUiOiJaaGFuZyIsImxvY2FsZSI6ImVuLUdCIn0.KK8NhgCcOJU7hh7GZYT04RcnMbOgyfIP1VvDSsQpXmHYljEzNC2hbZ4yBvMUVDhfKtxgcyQI7D3TwNHorSL8PvsrwCqcXvRns3mxuqtxb3XiDFNqX1GOpnsylVEnMln2g0lkE-6CIxGFhOhUfE6kTf3S5SV1BaP9ZxEEnVyUT9zebRD2xnO7Aqknb9ObrV7mgEZ13c60LTmcM826KQZFjkYuUmbrLlEMIHUxj0cfkG96ZN-ppA3dKz791ON_heZso3MKsoHhqLr8g9433r1f_SnwGmNI2TNX3URxYtzgw-gtEhfFcL7SzURgYDk3ks9kiyL-j8GyNdUVP8LBBNBDQA","expiry_date":1522435986923}



google + API return, response={"kind":"plus#person","etag":"\"EhMivDE25UysA1ltNG8tqFM2v-A/8LNXYPQuGf-Wdi4V2KzpGgO0Acc\"","gender":"male","emails":[{"value":"dike.zhang@gmail.com","type":"account"}],"objectType":"person","id":"104569518247344781776","displayName":"Dustin Zhang","name":{"familyName":"Zhang","givenName":"Dustin"},"url":"https://plus.google.com/104569518247344781776","image":{"url":"https://lh4.googleusercontent.com/-3jkN2SgauE0/AAAAAAAAAAI/AAAAAAAABGU/W7CwsmctBaY/photo.jpg?sz=50","isDefault":false},"organizations":[{"name":"Trustwave.com","title":"Senior Java Developer","type":"work","startDate":"2011","primary":true},{"name":"The economical insurance group","title":"Java developer","type":"work","startDate":"2008","endDate":"2011","primary":false}],"isPlusUser":true,"language":"en_GB","circledByCount":22,"verified":false}, type=true
email="dike.zhang@gmail.com"

===========================
email service
https://stackoverflow.com/questions/48242761/how-do-i-use-oauth2-and-refresh-tokens-with-the-google-api

#now  we build the API service object    
service = build('gmail', 'v1', credentials=credentials)
#ok. awesome!
#what email did they use? (this is just an example of how to use the api - you can skip this part if you want)
profile = service.users().getProfile(userId="me").execute()
email_address = profile['emailAddress']

// oauth2Client.refreshAccessToken().then((resp)=>{
//   console.log('response=%j', resp)
// }).catch((err) => {
//   log.error('error refresh access token, err = %j', err);
//   return res.status(500).json(err);
// });
// oauth2Client.setCredentials({
//   access_token: 'ACCESS TOKEN HERE',
//   refresh_token: 'REFRESH TOKEN HERE'
//   // Optional, provide an expiry_date (milliseconds since the Unix Epoch)
//   // expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7)
// });
