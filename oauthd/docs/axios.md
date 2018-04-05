var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


  // axios.get('/user?ID=12345')
  //
//   axios.get('/user', {
//   params: {
//     ID: 12345
//   }
// })
// .then(function (response) {
//   console.log(response);
// })


let opts = {
    hostname:'localhost',
    port:'3001',
    path:path,
    headers:headers,
    method:'POST'
};


https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me&prompt=consent&
state=%7B%22path%22%3A%22test_path%22%2C%22app%22%3A%22tiger%22%7D&response_type=code&client_id=880282470989-dqq737l2npo94h1r4rf33sql57hnp9cj.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3100%2Fgoogle%2Fcallback
