const UserMapper = require('./UserMapper');

const { User } = require('../database/models');

class UserRepository {
  async getAll() {
    const profile = await User.findAll();
    return profile.map(UserMapper.toEntity);
  }

  async registerUser(users) {
    const { valid, errors } = users.validate();
    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }

    const { dataValues } = await User.create(UserMapper.toDatabase(users));
    return dataValues;
  }
}

module.exports = UserRepository;
