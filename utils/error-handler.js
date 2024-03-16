const { ValidationError } = require('mongoose').MongooseError;

/**
 * @param {*} err error object of different types
 * @param {import('express').Request} req express request object
 * @param {import('express').Response} res express response object
 * @param {function} next call the next middleware
 */
function errorHandler(err, req, res, next) {
  console.log('\nerror handler\n\n');
  console.error(err, '\n');

  const customError = {
    msg: err.message || 'Something went wrong. Try again later.',
    statusCode: err.statusCode || 500
  }

  if (err.codeName === 'DuplicateKey') {
    customError.statusCode = 400;
    customError.msg = `${Object.keys(err.keyValue)} already exist : ${Object.values(err.keyValue)}`
  }

  if (err instanceof ValidationError) {
    customError.statusCode = 400;
    customError.msg = `${Object.keys(err.errors)} is not valid. Try again`
  }

  res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;