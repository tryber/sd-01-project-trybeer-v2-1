import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

function CardOrder({ index, att }) {
  const { id_order: idOrder, total, date } = att;
  return (
    <div className="CardOrder card">
      <Link to={`/orders/${idOrder}`}>
        <h2 className="order-id" data-testid={`${index}-order-number`}>{`Pedido número: ${idOrder}`}</h2>
        <h3 className="order-price" data-testid={`${index}-order-total-value`}>Total: {`R$ ${total.toFixed(2).toLocaleString('pt-BR')}`}</h3>
        <h3 data-testid={`${index}-order-date`} className="order-data">Data: {date}</h3>
      </Link>
    </div>
  );
}

export default CardOrder;
