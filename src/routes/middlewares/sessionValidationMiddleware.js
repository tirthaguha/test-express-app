// const onFinished = require('on-finished');

const sessionValidationMiddleware = (req, res, next) => {
  res.locals.isSessionValid = true;

  // onFinished(res, (err, resp) => {
  // do nothing
  // });
  next();
};

module.exports = sessionValidationMiddleware;
