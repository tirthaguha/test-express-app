if (!process.env.NODE_ENV) {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nocache = require('nocache');
const helmet = require('helmet');
const cors = require('cors');
const { createApp, registerMultipleRoutes } = require('@rapidcode/app');

const usersRouter = require('./routes/users');
const productRouter = require('./routes/products');

const app = createApp();
app.use(logger('dev'));
app.use(cors());
app.use(nocache());
app.use(helmet());
app.use(cookieParser());

registerMultipleRoutes(app, [
  { path: '/products', router: productRouter },
  { path: '/users', router: usersRouter },
]);

module.exports = app;
