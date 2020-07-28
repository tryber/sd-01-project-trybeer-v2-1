const basePassword = {
  password: '123456',
};

const baseEmail = {
  email: 'tryber@gmail.com',
};

const baseLoginClient = {
  password: '123456',
  email: 'script@yahoo.com',
};

const invalidEmail = { email: 'test.com', ...basePassword };

const invalidPassword = { ...baseEmail };

const passwordFormsValid = { ...baseEmail, password: '1234567' };

const emailFormsValid = { email: 'dodggg@gmail.com', ...basePassword };

const validLogin = { ...baseEmail, ...basePassword };

module.exports = {
  invalidEmail,
  invalidPassword,
  passwordFormsValid,
  emailFormsValid,
  validLogin,
  basePassword,
  baseLoginClient,
};
