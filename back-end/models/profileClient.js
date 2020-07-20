const { connectionPromise } = require('../services/connectionPromise');
const createTokenJWT = require('../services/createJWT');
const tokenValid = require('../services/decryptJwt');

const updateUserName = async (user, nameUser) => {
  const idUser = user[0].id_user;
  const query = `call updateUser("${idUser}", "${nameUser}")`;
  const data = await connectionPromise(query);

  const { email, name, role, id_user } = data[0];
  const token = createTokenJWT({ email, name, role, id_user });

  return ({ name, email, token, role });
};

const getUser = async (token, name) => {
  const { email } = tokenValid(token);
  const query = `call getUser("${email}")`;
  const data = await connectionPromise(query);

  return updateUserName(data, name);
};

module.exports = {
  getUser,
};
