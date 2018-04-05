Nodejs+Express创建HTTPS服务器
https://www.jianshu.com/p/853099ae2edd


https://www.sitepoint.com/how-to-use-ssltls-with-node-js/

1) use openssl generate .crt file
```
＃生成私钥key文件
openssl genrsa 1024 > private.pem

＃通过私钥文件生成CSR证书签名
openssl req -new -key private.pem -out csr.pem

＃通过私钥文件和CSR证书签名生成证书文件
openssl x509 -req -days 365 -in csr.pem -signkey private.pem -out ocbl.crt

```

2) in expressjs
```js

var app = require('express')();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/path/to/private.pem', 'utf8');
var certificate = fs.readFileSync('/path/to/file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 18080;
var SSLPORT = 18081;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

// Welcome
app.get('/', function(req, res) {
    if(req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    }
    else {
        res.status(200).send('Welcome!');
    }
});

```
