const User = require('../../domain/user');

const UserMapper = {
  toEntity({ dataValues }) {
    const { id_user, name, email, role } = dataValues;
    return new User({ id_user, name, email, role });
  },

  toDatabase(survivor) {
    const { id_user, name, email, role } = survivor;
    return { id_user, name, email, role };
  },
};

module.exports = UserMapper;
