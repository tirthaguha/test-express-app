const dataValidationMiddleware = (req, res, next) => {
  try {
    console.log('req.path ', req.path, ' in dataValidationMiddleware');
    res.locals.isDataValid = true;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = dataValidationMiddleware;
