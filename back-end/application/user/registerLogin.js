const UserRepository = require('../../infrastructure/user/UserRepository');
const User = require('../../domain/user');
const createJWT = require('../../services/createJWT');

exports.register = async (req, res) => {
  const user = new User(req.body);
  await new UserRepository().registerUser(user);

  return res.status(200).json({ message: 'Registered successfully.' });
};

exports.login = async (req, res) => {
  const login = await new UserRepository().login(req.body);

  if (!login) return res.status(400).json({ message: 'Invalid Fields' });

  const { name, email, role, id_user } = login;
  const token = createJWT({ name, email, role, id_user });

  return res.status(201).json({ name, email, role, token });
};
