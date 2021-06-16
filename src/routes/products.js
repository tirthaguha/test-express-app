const { RouteBuilder } = require('@rapidcode/app-config');
const { createAsyncMiddleware } = require('@rapidcode/middleware-factory');

const sessionValidationMiddleware = require('./middlewares/sessionValidationMiddleware');
const dataValidationMiddleware = require('./middlewares/dataValidationMiddleware');
const dataService = require('./middlewares/dataService');

const routeBuilder = new RouteBuilder();

const asyncServiceMiddleware = createAsyncMiddleware({ func: dataService });

const anotherAsyncMiddleware = async (req, res, next) => {
  try {
    const response = await dataService();
    res.locals.testData = response;
    next();
  } catch (error) {
    next(error);
  }
};

const userController = (req, res, next) => {
  try {
    const { isDataValid, isSessionValid, gotRequesterResponse } = res.locals;
    if (isDataValid && isSessionValid) {
      res.send(gotRequesterResponse);
    } else {
      const error = { message: 'session or data is not valid' };
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const routeBuilder2 = new RouteBuilder();

let route = routeBuilder
  .setPath('/')
  .setMethod('GET')
  .setMiddlewares([
    sessionValidationMiddleware,
    dataValidationMiddleware,
    asyncServiceMiddleware,
    anotherAsyncMiddleware,
  ])
  .setController(userController)
  .build();

route = routeBuilder2
  .setPath('/')
  .setMethod('POST')
  .setMiddlewares([
    sessionValidationMiddleware,
    dataValidationMiddleware,
    asyncServiceMiddleware,
    anotherAsyncMiddleware,
  ])
  .setRouter(route)
  .setController(userController)
  .build();
module.exports = route;
