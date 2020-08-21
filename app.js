const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const fileListRouter = require('./routes/files');
const playlistRouter = require('./routes/playlists');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

app.use('/files', fileListRouter);
app.use('/files/upload', fileListRouter);
app.use('/files/update/*', fileListRouter);
app.use('/files/delete/*', fileListRouter);

app.use('/playlists', playlistRouter);
app.use('/playlists/create', playlistRouter);
app.use('/playlists/update/*', playlistRouter);
app.use('/playlists/delete/*', playlistRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

module.exports = app;
