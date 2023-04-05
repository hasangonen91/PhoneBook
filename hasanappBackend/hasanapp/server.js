'use strict';
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken");

const mongoose = require('mongoose');
const option = {
    maxPoolSize: 50, 
    wtimeoutMS: 2500,
    useNewUrlParser: true
};

mongoose.connect('mongodb+srv://hasanmongodb:SzUUn9x1lZxc5LNO@cluster0.p209cui.mongodb.net/test?retryWrites=true&w=majority', option).then(()=>console.log('connected'))
.catch(e=>console.log(e));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'hasanapp', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
var routes = require('./api/routes/userRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log(' hasanapp server started on: ' + port);

module.exports = app;