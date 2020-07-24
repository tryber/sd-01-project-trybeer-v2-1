const UserMapper = require('./UserMapper');
const { User } = require('../database/models');
const { encrypt, decrypt } = require('../../services/crypto');

class UserRepository {
  async getAll() {
    const profile = await User.findAll();
    return profile.map(UserMapper.toEntity);
  }

  async registerUser(users) {
    const { valid, errors } = users.validate();
    const { name, password, email, role } = users;
    const encryptPassword = encrypt(password);

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }

    const { dataValues } = await User.create(UserMapper.toDatabase({ name, password: encryptPassword, email, role }));
    return dataValues;
  }

  async _loginValidEmail(email, password) {
    const findEmail = await User.findOne({ where: { email } });
    if (!findEmail) throw new Error('SequelizeEmailNotFound');

    const unencryptedPassword = decrypt(findEmail.password);

    if (unencryptedPassword !== password) throw new Error('SequelizePasswordIncorret');

    return findEmail;
  }

  async login({ email, password }) {
    const user = await this._loginValidEmail(email, password);
    return UserMapper.toEntity(user);
  }
}

module.exports = UserRepository;
