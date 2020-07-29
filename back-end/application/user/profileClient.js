const UserRepository = require('../../infrastructure/user/UserRepository');
const createJWT = require('../../services/createJWT');

exports.profileClient = async (req, res) => {
  const dataProfile = await new UserRepository().updateProfileClient(req.body, req.payload);

  const { name, email, role, id_user } = dataProfile;
  const token = createJWT({ name, email, role, id_user });

  return res.status(200).json({ id_user, name, email, role, token });
};
