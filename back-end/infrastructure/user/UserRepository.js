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

    const { dataValues } = await User.create(UserMapper.toDatabase({
      name, password: encryptPassword, email, role,
    }));
    return dataValues;
  }

  async _updateProfileClient(name, payload) {
    const { id_user, email } = payload;

    const updateStatus = await User.update(
      UserMapper.toDatabase({ name }),
      { where: { id_user, email } },
    );

    if (updateStatus[0] === 0) throw new Error('UserUpdateIsNotValid');

    const newUserData = await User.findOne({ where: { id_user, email } });
    return newUserData;
  }

  async updateProfileClient({ name }, payload) {
    const updateUser = await this._updateProfileClient(name, payload);
    return updateUser;
  }

  async _loginValidEmail(email, password) {
    const findEmail = await User.findOne({ where: { email } });
    if (!findEmail) throw new Error('EmailOrPassordInvalid');

    const unencryptedPassword = decrypt(findEmail.password);

    if (unencryptedPassword !== password) throw new Error('EmailOrPassordInvalid');

    return findEmail;
  }

  async login({ email, password }) {
    const user = await this._loginValidEmail(email, password);
    return UserMapper.toEntity(user);
  }
}

module.exports = UserRepository;
