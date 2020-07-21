'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'tryber',
          password: 'U2FsdGVkX1+VEr77ZZsY1np0AxvGEoaeyPooPgY/sDI=',
          email: 'tryber@gmail.com',
          role: 'admin',
        },
      ],
      {}
    );
  },
  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
