require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConnect = require('./backend/lib/connectLib');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('./backend/lib/dbUserBotstrap').createUsers();

var app = express();

dbConnect.connect();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', usersRouter);

module.exports = app;
