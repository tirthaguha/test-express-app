const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nocache = require('nocache');
const helmet = require('helmet');
const cors = require('cors');

module.exports.appConfig = ({ useLogger, useCors, useNoCache, useHelmet }) => {
  const app = express();
  if (useLogger) {
    app.use(logger('dev'));
  }
  if (useCors) {
    app.use(cors());
  }
  if (useNoCache) {
    app.use(nocache());
  }
  if (useHelmet) {
    app.use(helmet.xssFilter());
    app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  return app;
};

const addGenericErrorHandler = (app) => {
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
};

module.exports.registerRoute = (app, routes, useGenericErrorHandlers) => {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
  if (useGenericErrorHandlers) {
    addGenericErrorHandler(app);
  }
};

const createRouteConfig = ({
  path,
  method,
  middlewares,
  controller,
  router = express.Router(),
}) => {
  router.route(path)[method.toLowerCase()](...middlewares, controller);
  return router;
};

module.exports.createMultipleRouteConfigs = (routeConfig) => {
  const router = express.Router();
  routeConfig.forEach((config) => {
    createRouteConfig({ ...config, router });
  });
  return router;
};

module.exports.createRouteConfig = createRouteConfig;
