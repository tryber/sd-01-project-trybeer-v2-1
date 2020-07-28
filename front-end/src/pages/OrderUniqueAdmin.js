import React, { useState, useEffect } from 'react';
import { getUser } from '../service';
import NavBar from '../component/NavBar';
import OrderUnique from '../component/OrderUnique';
import '../styles/OrderUniqueAdmin.css';

const fetchUpdate = async (lastCharacter, method, newStatus, setData = '') => {
  const result = await fetch(`http://localhost:3001/admin/orders/${lastCharacter}`, {
    method, headers: {
      'Content-Type': 'application/json',
      authorization: getUser().token,
    },
    body: { newStatus }
  })
  const resolve = await result.json();
  if (setData) setData(resolve);
  return resolve;
}

const updateStatus = (actualStatus) => actualStatus === 'Pendente' ? 'Preparando' : 'Entregue';

function OrderUniqueAdmin({ match: { params: { id } } }) {
  const [update, setUpdate] = useState(0);
  const [data, setData] = useState();

  useEffect(() => {
    if (data) fetchUpdate(id, 'PUT', updateStatus(data.dataPurchase.status))
    fetchUpdate(id, 'GET', null, setData)
  }, [update])

  return (
    <div className="Admin OrderUniqueAdmin">
      <NavBar />
      {!data && <section className="container">
        <h1 className="loader"></h1>
      </section>}
      {data && <section className="statusOrder">
        <OrderUnique data={data} />
        <button
          data-testid="mark-as-delivered-btn"
          hidden={data.dataPurchase.status === 'Entregue'}
          className="btn-delivery"
          onClick={() => setUpdate(new Date())}
        >
          {(data.dataPurchase.status === 'Pendente') ? 'Preparar pedido' : 'Marcar como entregue'}
        </button>
      </section>}
    </div>
  )
}

export default OrderUniqueAdmin;
