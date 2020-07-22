const UserMapper = require('./UserMapper');

const { User } = require('../database/models');

class UserRepository {
  async getAll() {
    const profile = await User.findAll();
    return profile.map(UserMapper.toEntity);
  }
}

module.exports = UserRepository;
