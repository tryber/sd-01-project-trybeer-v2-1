import React, { useState, useEffect } from 'react';
import { getUser } from '../service';
import { requestWithToken } from '../service/serviceFetch';
import NavBar from '../component/NavBar';
import OrderUnique from '../component/OrderUnique';
import '../styles/OrderUniqueAdmin.css';
import { Redirect } from 'react-router-dom';

function HeaderAuthorization(method) {
  const token = getUser().token;
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
  }
}

const getOrder = async (id, method = 'GET') => {
  const url = `http://localhost:3001/admin/orders/${id}`;

  const response = await fetch(url, HeaderAuthorization(method));
  const data = await response.json();
  return data;
}

const updateStatus = async (id, setOrder) => {
  getOrder(id, 'PUT').then(result => {
    setOrder(result.data);
  });
}

function OrderUniqueAdmin({ match: { params: { id } } }) {
  const [order, setOrder] = useState();
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    if ((!isFetching && !order)) {
      setIsFetching(true);
      getOrder(id).then(result => {
        setOrder(result);
        setIsFetching(false);
      });
    }
  }, [isFetching]);
  return (
    <div className="Admin OrderUniqueAdmin">
      <NavBar />
      {isFetching && <section className="container">
        <h1 className="loader"></h1>
      </section>}
      {order && <section className="statusOrder">
        <OrderUnique data={order} />
        <button
          data-testid="mark-as-delivered-btn"
          hidden={order.dataPurchase.status === 'Entregue'}
          className="btn-delivery"
          disabled={isFetching}
          onClick={() => updateStatus(id, setOrder)}
        >
          {(order.dataPurchase.status === 'Pendente') ? 'Preparar pedido' : 'Marcar como entregue'}
        </button>
      </section>}
    </div>
  )
}

export default OrderUniqueAdmin;
