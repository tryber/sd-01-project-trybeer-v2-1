import React from 'react';
import Headers from '../component/Header';
import { Redirect } from 'react-router-dom';
import '../styles/OneOrder.css';
import { getUser } from '../service';
import useAxios from 'axios-hooks';


function OneOrder({ match }) {
  const { params: { id } } = match;
  const [{ data, loading, error }] = useAxios({
    url: `http://localhost:3001/orders/${id}`,
    method: 'GET',
    headers: { authorization: getUser().token, }
  })
  if (error) return <Redirect to="/" />
  if (!getUser()) return <Redirect to="/" />
  return (
    <div className="OneOrder">
      <Headers id={id} />
      {!loading || <h2>Loading</h2>}
      {loading || <div className="div-order">
        <h2 data-testid="order-number" >Pedido número: {data.dataPurchase.id_order}</h2><h3 data-testid="order-date">Data: {data.dataPurchase.date}</h3>
        <div className="list-products">
          {data.dataProducts.map((item, index) => (
            <div className="detail-products">
              <h2 data-testid={`${index}-product-name`} >Name: {item.name_product}</h2>
              <h2 data-testid={`${index}-product-qtd`}>Quantidade: {item.quantity}</h2>
              <h2 data-testid={`${index}-product-total-value`}>Total item: R$ {item.total.toFixed(2).toLocaleString('pt-BR')}</h2>
            </div>
          ))}
        </div>
        <h2 data-testid="order-total-value">{`Total: R$ ${data.dataPurchase.priceTotal.toFixed(2).toLocaleString('pt-BR')}`}</h2>
      </div>
      }
    </div>
  );
}

export default OneOrder;
