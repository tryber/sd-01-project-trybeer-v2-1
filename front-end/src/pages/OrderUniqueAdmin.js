import React, { useState, useEffect } from 'react';
import { getUser } from '../service';
import NavBar from '../component/NavBar';
import OrderUnique from '../component/OrderUnique';
import '../styles/OrderUniqueAdmin.css';

const fetchUpdate = async (lastCharacter, method, setData = '') => {
  const result = await fetch(`http://localhost:3001/admin/orders/${lastCharacter}`, {
    method, headers: {
      'Content-Type': 'application/json',
      authorization: getUser().token,
    },
  })
  const resolve = await result.json();
  if (setData) setData(resolve)
  return resolve;
}

function OrderUniqueAdmin({ location: { pathname } }) {
  const [update, setUpdate] = useState(0);
  const [data, setData] = useState();
  const lastCharacter = pathname.replace('/admin/orders/', '');

  useEffect(() => {
    if (data) fetchUpdate(lastCharacter, 'PUT')
    fetchUpdate(lastCharacter, 'GET', setData)
  }, [update])

  let status = 1;
  if (data) status = data.dataPurchase.status;

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
          hidden={status}
          className="btn-delivery"
          onClick={() => setUpdate(new Date())}
        >
          Marcar como entregue
        </button>
      </section>}
    </div>
  )
}

export default OrderUniqueAdmin;
