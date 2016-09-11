const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Import and Configure Console.Slack (Thanks David <3)
// const slack = require('console-slack');
// slack.options = {
//   webhook : "https://hooks.slack.com/services/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",
//   username: "console.slack.bot",
//   emoji : ":trollface:",
//   channel : "#payx-logs"
// };

// Import and Configure and Sync Sequelize Models.
const models = require('./models');
models.sequelize.sync({ force: true })
    .then(function() {
      console.log('Database Synchronised Successfully!');
    }, function (err) {
      console.log('Unable to Synchronise Database:', err);
    });

const app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware Setup
//app.use(favicon(path.join(__dirname, 'public/img', 'icon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Application Routes
app.use('/', require('./routes'));

// Catch 404 and forward to Error Handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development Error Handler (stack-traces printed)
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  });
}

// Production Error Handler (no stack-traces printed)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: {} });
});

module.exports = app;