const UserMapper = require('./UserMapper');
const { User } = require('../database/models');
const { encrypt } = require('../../services/crypto');

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
}

module.exports = UserRepository;
