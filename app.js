require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConnect = require('./backend/lib/connectLib');
var session = require('express-session');
var config = require('./backend/config/config');
var MongoStore = require('connect-mongo');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('./backend/lib/dbUserBotstrap').createUsers();

var app = express();
dbConnect.connect();

app.use(session({
    resave:false, 
    saveUninitialized:false, 
    secret:config.session_secret, 
    cookie:{maxAge:config.sessionCookiExpiryInMilliSec},
    store: MongoStore.create({ mongoUrl: config.mongo_connection_string })
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', usersRouter);

module.exports = app;
