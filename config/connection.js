const { connect, connection } = require('mongoose');

const URI = process.env.DB_URI;

if (URI) {
  connect(URI);
} else {
  throw new Error('Missing DB_URI');
}

module.exports = connection;