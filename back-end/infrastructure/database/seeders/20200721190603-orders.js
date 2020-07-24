'use strict';

module.exports = {
  up: async (queryInterface) => (
    queryInterface.bulkInsert(
      'Orders',
      [
        {
          user_id: 2,
          data: new Date(),
          address: 'Belo Horizonte',
          address_number: 1001,
          status: 0,
        },
      ],
      {},
    )
  ),

  down: async (queryInterface) => queryInterface.bulkDelete('Orders', null, {}),
};
