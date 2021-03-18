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

module.exports = app;
