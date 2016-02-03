var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db=require( './db' );
var connect=require('connect');
var session = require('express-session');


var routes = require('./routes/index');
var users = require('./routes/users');
var admin=require('./routes/admin');

//ex4 session 使用范例
//var session = require('express-session');
//var connect = require('connect');
//var SessionStore = require("session-mongoose")(connect);
//app.use(session({
//  secret: settings.cookie_secret,
//  store: new SessionStore({
//    url: "mongodb://localhost/session",
//    interval: 120000
//  })
//}));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({
//  resave:false,//添加这行
//  saveUninitialized: true,//添加这行
//  secret: 'fs',
//  key: 'fs',
//  cookie: { maxAge: 20000}
//}));
//app.use(session({ secret: 'fs',  ,cookie: { maxAge: 20000}}));
//app.use(session({secret: settings.cookieSecret,store: new MongoStore({db: settings.db})}));
//算了，最新的session-mongodb居然不支持最新的express和connect也是醉了，只能自己写mongo，但是实在懒得写，扔到之后的版本吧
app.use(session({
  secret: 'nkbh', // 随机字符串加密
  cookie: { maxAge: 60 * 1000 }
}));

;
app.use('/', routes);
app.use('/users', users);
app.use('/admin',admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
