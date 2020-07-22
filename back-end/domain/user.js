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
  role: {
    type: String,
    required: true,
  },
})(
  class User {
    dataUser() {
      return this;
    }
  }
);

module.exports = User;
