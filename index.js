// index.js - Request Header Parser Microservice
require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();

// Enable CORS so FCC can remotely test the API
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from /public
app.use(express.static('public'));

// GET /api/whoami - Return IP, language, and software from headers
app.get('/api/whoami', function (req, res) {
  var ipaddress =
    req.headers['x-forwarded-for']
      ? req.headers['x-forwarded-for'].split(',')[0].trim()
      : req.socket.remoteAddress;

  var language = req.headers['accept-language'] || 'unknown';

  var software = req.headers['user-agent'] || 'unknown';

  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Request Header Parser Microservice running on port ' + port);
});
