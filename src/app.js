const path = require('path');
const logger = require('morgan');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const container = require('./infra/cross-cutting/');
const { scopePerRequest } = require('awilix-express');
const indexRouter = require('./presentation/api/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/presentation/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(scopePerRequest(container));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' 
    ? err 
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;