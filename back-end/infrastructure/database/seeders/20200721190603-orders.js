module.exports = {
  up: async queryInterface => (
    queryInterface.bulkInsert(
      'Orders',
      [
        {
          id_user: 2,
          data: new Date(),
          address: 'Belo Horizonte',
          address_number: 1001,
          status: 'Pendente',
        },
        {
          id_user: 2,
          data: new Date(),
          address: 'Belo Horizonte',
          address_number: 1001,
          status: 'Entregue',
        },
        {
          id_user: 2,
          data: new Date(),
          address: 'Belo Horizonte',
          address_number: 1001,
          status: 'Entregue',
        },
        {
          id_user: 3,
          data: new Date(),
          address: 'Sarzedo',
          address_number: 10,
          status: 'Pendente',
        },
        {
          id_user: 3,
          data: new Date(),
          address: 'Sarzedo',
          address_number: 10,
          status: 'Preparando',
        },
      ],
      {},
    )
  ),

  down: async queryInterface => queryInterface.bulkDelete('Orders', null, {}),
};
