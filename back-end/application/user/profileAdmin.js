const UserRepository = require('../../infrastructure/user/UserRepository');

exports.adminProfile = async (_req, res) => {
  const profile = new UserRepository;
  const dataProfile = await profile.getAll();

  return res.status(200).json(dataProfile);
};
