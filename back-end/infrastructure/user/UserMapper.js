const User = require('../../domain/user');

const UserMapper = {
  toEntity({ dataValues }) {
    const { id_user, name, email, role } = dataValues;
    return new User({ id_user, name, email, role });
  },

  toDatabase(survivor) {
    const { name, password, email, role } = survivor;
    return { name, password, email, role };
  },
};

module.exports = UserMapper;
