const UserRepository = require('../../infrastructure/user/UserRepository');

exports.adminProfile = async (_req, res) => {
  const dataProfile = await new UserRepository().getAll();

  return res.status(200).json(dataProfile);
};
