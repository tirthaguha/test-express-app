if (!process.env.NODE_ENV) {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nocache = require('nocache');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(nocache());
app.use(helmet.xssFilter());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(cors());

app.use('/users', usersRouter);

app.use((req, res, next) => {
  next({ status: 404, message: 'invalid route' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  return res.json(
    { message: err.message } || { message: 'internal server error' }
  );
});

module.exports = app;
