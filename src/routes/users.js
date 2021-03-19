const express = require('express');
const got = require('got');

const router = express.Router();

const sessionValidationMiddleware = (req, res, next) => {
  try {
    console.log(
      'Validate your session cookie, JWT, or authToken here',
      req.headers
    );
    res.locals.isSessionValid = true;
    next();
  } catch (error) {
    next(error);
  }
};

const dataValidationMiddleware = (req, res, next) => {
  try {
    console.log('Validate your data here, with Joi', req.params);
    res.locals.isDataValid = true;
    next();
  } catch (error) {
    next(error);
  }
};

const asyncServiceMiddleware = async (req, res, next) => {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const options = {
      method: 'GET',
    };
    const response = await got(url, options);
    const jsonBody = JSON.parse(response.body);
    console.log('Service Response', jsonBody);
    res.locals.serviceResponse = jsonBody;
    next();
  } catch (error) {
    next(error);
  }
};

/* GET users listing. */
router.get(
  '/',
  sessionValidationMiddleware,
  dataValidationMiddleware,
  asyncServiceMiddleware,
  (req, res, next) => {
    try {
      const { isDataValid, isSessionValid, serviceResponse } = res.locals;
      if (isDataValid && isSessionValid) {
        res.send(serviceResponse);
      } else {
        const error = { message: 'session or data is not valid' };
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
