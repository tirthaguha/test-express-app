if (!process.env.NODE_ENV) {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nocache = require('nocache');
const helmet = require('helmet');
const cors = require('cors');
const { appSetup, registerRouteWithApp } = require('@rapidcode/app-config');

const usersRouter = require('./routes/users');
const productRouter = require('./routes/products');

const app = appSetup();
app.use(logger('dev'));
app.use(cors());
app.use(nocache());
app.use(helmet());
app.use(cookieParser());

registerRouteWithApp(
  app,
  [{ path: '/products', router: productRouter }],
  false
);
registerRouteWithApp(app, [{ path: '/users', router: usersRouter }], true);

module.exports = app;
