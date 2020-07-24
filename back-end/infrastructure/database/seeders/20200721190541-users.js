'use strict';

module.exports = {
  up: async (queryInterface) => (
    queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'tryber',
          password: 'U2FsdGVkX1+VEr77ZZsY1np0AxvGEoaeyPooPgY/sDI=',
          email: 'tryber@gmail.com',
          role: 'admin',
        },
        {
          name: 'Teste',
          password: 'U2FsdGVkX19ikiquJg2n2mo3UKtKm5DZWXL+VI3ju0s=',
          email: 'teste@gmail.com',
          role: 'client',
        },
      ],
      {},
    )
  ),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
