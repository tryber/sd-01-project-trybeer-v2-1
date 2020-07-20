import React from 'react';

const statusOrder = (status) => {
  if (status === 0) return 'Pendente';
  return 'Entregue';
}

const orderProducts = (dataProducts) => (
  <ul>
    {dataProducts.map(({ name_product, price, quantity }, index) =>
      <li key={name_product}>
        <span data-testid={`${index}-product-qtd`} className="detail">
          {quantity}
        </span>
        <span data-testid={`${index}-product-name`} className="detail">
          - {name_product}
        </span>
        <span data-testid={`${index}-product-total-value`} className="detail">
          {` R$ ${(price * quantity).toFixed(2).toLocaleString('pt-BR')}`}
        </span>
      </li>)
    }
  </ul>
)

const OrderUnique = (props) => {
  if (props.data.message) return 'Pedido não registrado';

  const { dataProducts, dataPurchase } = props.data;
  const { id_order: idOrder, priceTotal, status } = dataPurchase;

  return (
    <div className="div-order detail-products">
      <h1>
        <span data-testid="order-number">Pedido {idOrder}</span>
        <span data-testid="order-status"> - {statusOrder(status)}</span>
      </h1>
      {orderProducts(dataProducts)}
      <section data-testid="order-total-value" className="total-value">
        Total: R$ {priceTotal.toFixed(2).toLocaleString('pt-BR')}
      </section>
    </div>
  )
}

export default OrderUnique;
