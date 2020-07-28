const { decrypt } = require('./crypto');

function isNameValid(name = '') {
  const regex = /^[a-zA-Z-\s]{3,40}$/;
  return regex.test(name);
}

function isEmailValid(email = '') {
  const regex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email.toLowerCase());
}

function isPasswordValid(password = '') {
  const regex = /(^[0-9]{6,63})+$/;
  return regex.test(password);
}

function isAddressValid(number = '') {
  const regex = /(^[0-9]{1,10})+$/;
  return regex.test(number);
}

function verifyPassword(passwordUser, password) {
  return passwordUser === decrypt(password);
}

function formatDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

function isNumber(number = '') {
  const regex = /^[0-9]+$/;
  return regex.test(number);
}

module.exports = {
  isEmailValid,
  isNameValid,
  isPasswordValid,
  verifyPassword,
  formatDate,
  isNumber,
  isAddressValid,
};
