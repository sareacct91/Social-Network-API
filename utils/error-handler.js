const { ValidationError } = require('mongoose').MongooseError;

function errorHandler(err, req, res, next) {
  console.log('\nerror handler\n\n');
  console.error(err, '\n', err.keyValue);
  // console.error(err instanceof ValidationError);

  const customError = {
    msg: err.message || 'Something went wrong. Try again later.',
    statusCode: err.statusCode || 500
  }

  if (err.codeName === 'DuplicateKey') {
    customError.statusCode = 400;
    customError.msg = `${Object.keys(err.keyValue)} already exist : ${Object.values(err.keyValue)}`
  }

  console.log('\n', customError);
  res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;