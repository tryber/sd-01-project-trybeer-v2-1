const UserRepository = require('../../infrastructure/user/UserRepository');
const User = require('../../domain/user');

exports.register = async (req, res) => {
  const user = new User(req.body);
  await new UserRepository().registerUser(user);

  return res.status(200).json({ message: 'Registered successfully.' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const login = await registerLogin.loginUser(email, password);

  if (!login) return res.status(400).json({ message: 'Invalid Fields' });

  return res.status(200).json(login);
};
