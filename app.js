'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mime = require('mime');
const fs = require('fs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Display routes
const index = require('./routes/index');
const users = require('./routes/users');
const archivos = require('./routes/archivos');
const mensaje = require('./routes/mensaje');
app.use(express.static('public'));
app.use('/', index);
app.use('/users', users);
app.use('/archivos', archivos);
app.use('/mensaje', mensaje);
app.get('/mensaje', (req,res) => {
  res.render('mensaje', {title:"¡Envíame un mensaje!"});
});

// Receive and send message
app.post('/post', function(req, res) {
  let text = '';
  if (req.body.nombre) {
    text += "Nombre: " + req.body.name + "\n";
  }
  text += "Mensaje: " + req.body.mensaje;
  res.send(text);
});

app.get('/archivos/archivito.rar', function(req, res){
  let file = __dirname + '/qBittorrent/Westworld S01 Season 1 Complete HDTV 720p x265 AAC E-Subs [GWC]/archivito.rar';
  res.download(file); // Set disposition and send it.
});
app.get('/archivos/hostschanger.bat', function(req, res){
  let file = __dirname + '/public/files/hostschanger.bat';
  res.download(file); // Set disposition and send it.
});
// Westworld
app.get('/archivos/:file', (req, res) => {
  const file = __dirname + '/qBittorrent/Westworld S01 Season 1 Complete HDTV 720p x265 AAC E-Subs [GWC]/' + req.params.file;
  fs.stat(file, function(err, stat) {
    if(err === null) {
      res.download(file, (err) => {
      if (err) {
        if (err.code === "ECONNABORTED") {
          console.log('Download was stopped.');
        } else {
        console.log(err.code);
        }
      }
    });
    } else if(err.code === 'ENOENT') {
      res.send('File does not exist');
    } else {
      console.log('Alia eraro: ', err.code);
    }
  }); 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
