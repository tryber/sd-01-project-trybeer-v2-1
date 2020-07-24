'use strict';

module.exports = {
  up: async (queryInterface) => (
    queryInterface.bulkInsert(
      'Orders_products',
      [
        {
          id_order: 1,
          id_product: 2,
          quantity: 2,
        },
        {
          id_order: 2,
          id_product: 4,
          quantity: 2,
        },
        {
          id_order: 2,
          id_product: 3,
          quantity: 1,
        },
        {
          id_order: 3,
          id_product: 2,
          quantity: 2,
        },
        {
          id_order: 3,
          id_product: 5,
          quantity: 4,
        },
        {
          id_order: 4,
          id_product: 5,
          quantity: 4,
        },
        {
          id_order: 5,
          id_product: 5,
          quantity: 4,
        },
      ],
      {},
    )
  ),

  down: async (queryInterface) => queryInterface.bulkDelete('Orders_products', null, {}),
};;
