const sessionValidationMiddleware = (req, res, next) => {
  try {
    res.locals.isSessionValid = true;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = sessionValidationMiddleware;
