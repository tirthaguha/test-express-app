const dataValidationMiddleware = (req, res, next) => {
  try {
    res.locals.isDataValid = true;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = dataValidationMiddleware;
