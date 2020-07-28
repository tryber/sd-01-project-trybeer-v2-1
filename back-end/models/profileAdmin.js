const { connectionPromise } = require('../services/connectionPromise');
const tokenValid = require('../services/validJWT');

const getProfileAdmin = async (token) => {
  const { email } = tokenValid(token);
  const query = `SELECT name, email FROM users WHERE email = "${email}"`;
  const data = await connectionPromise(query);
  return data;
};

module.exports = {
  getProfileAdmin,
};
