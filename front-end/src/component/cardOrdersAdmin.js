import React from 'react';
import { Link } from 'react-router-dom';

function CardOrders({ index, orders }) {
  const { Total, address, address_number, data, id_order, status } = orders;

  return (
    <Link to={`/admin/orders/${id_order}`}>
      <section className="CardOrder card">
        <p data-testid={`${index}-order-number`}> Pedido {id_order}</p>
        <p data-testid={`${index}-order-address`}>Endereço: {address}, {address_number}</p>
        <p> Data de Compra: {data}</p>
        <p> Status: {status === 0 ? 'Pendente' : 'Entregue'}</p>
        <p data-testid={`${index}-order-total-value`}>Total: R${Total}</p>
      </section>
    </Link>
  );
};

export default CardOrders;
