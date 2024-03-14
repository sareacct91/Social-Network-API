function errorHandler(err, req, res, next) {
  console.error(err);

  const customError = {
    msg: err.message || 'Something went wrong. Try again later.',
    code: err.code || 500
  }

  res.status(customError.code).json({ msg: customError.msg });
};

module.exports = errorHandler;