var express = require('express');
var path = require('path');
var stylus = require('stylus');
var autoprefixer = require('autoprefixer-stylus');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var minify = require('express-minify');

var routes = require('./routes/index');
var about = require('./routes/about');
var generator = require('./routes/generator');

var app = express();

app.set('port', (process.env.PORT || 5000));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

express.static.mime.define(
{
    'text/stylus':        ['styl']
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: function(str, path) {
    return stylus(str)
      .use(autoprefixer())
      .set('filename', path)
      .set('compress', true)
    ;
  }
}));
app.use(minify());
app.use(express.static(path.join(__dirname, 'public')));

//set app main title; used in Jade templates
app.locals.title = "Baka Ipsum";
//set page title; used in _head.jade to set html title
app.locals.pageTitle = "Baka Ipsum";


app.use('/', routes);
app.use('/', generator);
app.use('/about', about);

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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
