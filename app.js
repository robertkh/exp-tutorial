var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var path = require('path');

// կանչում ա սրանց հենց այս կետից, բայց handler-ը չի կանչվում
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
////////////////////////////////////////////////////
//Устанавливаем соединение с mongoose

var mongoose = require('mongoose');
var mongoDB = 'mongodb://robert:parnarareg3@ds125302.mlab.com:25302/local_library';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/////////////////////////////////////////////////////
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/////////////////////////////////////////////////////////////
// init callbacks, then invokes Router երբ էջը բացում ենք
// Կարծես էստեղ ռոուտերները ինիցիլիզացվում են
app.use('/', indexRouter);
app.use('/users', usersRouter);

//////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

////////////////////////////////////////////////
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  //////////////////////////////////////////////////////
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;