const { attributes } = require('structure');

const User = attributes({
  id_user: Number,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
})(
  class User {
    dataUser() {
      const { id_user, name, email, password, role } = this;
      return { id_user, name, email, password, role };
    }
  }
);

module.exports = User;
