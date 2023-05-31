import createError from 'http-errors'
import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import userRouter from './routes/user';
import adminRouter from './routes/admin';
import connection from './model/connection'; 
import cors from 'cors';
import fileupload from 'express-fileupload'
require('dotenv').config()

var app = express();
connection()


app.use(cors())
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({limit:'10mb' ,extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload())

app.use('/', userRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app
