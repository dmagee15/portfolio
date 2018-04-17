'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var session = require('express-session');
var bodyparser = require('body-parser');
var path = require('path');

var app = express();
require('dotenv').load();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/dev', express.static(process.cwd() + '/dev'));
app.use('/output', express.static(process.cwd() + '/output'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
