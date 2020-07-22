const profileClient = require('../models/profileClient');

exports.profileClient = async (req, res) => {
  const { name } = req.body;
  const token = req.headers.authorization;
  const updatedUser = await profileClient.getUser(token, name);

  return res.status(200).json(updatedUser);
};
