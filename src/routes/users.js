const { RouteCreator } = require('@rapidcode/route');
const { createAsyncMiddleware } = require('@rapidcode/middleware');
const sessionValidationMiddleware = require('./middlewares/sessionValidationMiddleware');
const dataValidationMiddleware = require('./middlewares/dataValidationMiddleware');
const dataService = require('./middlewares/dataService');

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
    const { isDataValid, isSessionValid, dataServiceResponse } = res.locals;
    if (isDataValid && isSessionValid) {
      res.send(dataServiceResponse);
    } else {
      const error = { message: 'session or data is not valid' };
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const router = RouteCreator({
  path: '/',
  middlewares: [
    sessionValidationMiddleware,
    dataValidationMiddleware,
    asyncServiceMiddleware,
    anotherAsyncMiddleware,
  ],
  method: 'GET',
  controller: userController,
});

module.exports = router;
