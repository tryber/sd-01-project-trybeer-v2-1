'use strict';

module.exports = {
  up: async (queryInterface) => (
    queryInterface.bulkInsert(
      'Orders',
      [
        {
          id_user: 2,
          data: new Date(),
          address: 'Belo Horizonte',
          address_number: 1001,
          status: 'PENDENTE',
        },
        {
          id_user: 2,
          data: new Date(),
          address: 'Belo Horizonte',
          address_number: 1001,
          status: 'ENTREGUE',
        },
        {
          id_user: 2,
          data: new Date(),
          address: 'Belo Horizonte',
          address_number: 1001,
          status: 'ENTREGUE',
        },
        {
          id_user: 3,
          data: new Date(),
          address: 'Sarzedo',
          address_number: 10,
          status: 'PENDENTE',
        },
        {
          id_user: 3,
          data: new Date(),
          address: 'Sarzedo',
          address_number: 10,
          status: 'PREPARANDO',
        },
      ],
      {},
    )
  ),

  down: async (queryInterface) => queryInterface.bulkDelete('Orders', null, {}),
};
