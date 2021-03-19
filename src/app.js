if (!process.env.NODE_ENV) {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const { appConfig, registerRoute } = require('./utils/app-config');

const usersRouter = require('./routes/users');

const app = appConfig({
  useLogger: true,
  useCors: true,
  useNoCache: true,
  useHelmet: true,
});

registerRoute(app, [{ path: '/users', router: usersRouter }], true);

module.exports = app;
