const UserRepository = require('../../infrastructure/user/UserRepository');

exports.adminProfile = async (_req, res) => {
  const { id_user: id } = req.payload;
  const dataProfile = await new UserRepository().getOneById(id);

  return res.status(200).json(dataProfile);
};
