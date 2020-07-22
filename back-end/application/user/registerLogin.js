// const registerLogin = require('../../models/userRegisterLogin');

// exports.register = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   await registerLogin.registerUserDB(name, email, password, role);

//   return res.status(200).json({ message: 'Registered successfully.' });
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const login = await registerLogin.loginUser(email, password);

//   if (!login) return res.status(400).json({ message: 'Invalid Fields' });

//   return res.status(200).json(login);
// };
