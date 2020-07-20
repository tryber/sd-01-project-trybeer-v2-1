const connection = require('../models/connectionModel');

const connectionPromise = valueQuery =>
  new Promise((resolve, reject) => {
    connection.query(valueQuery, (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });

module.exports = { connectionPromise };
