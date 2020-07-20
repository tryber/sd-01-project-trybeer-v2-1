import React, { useState, useEffect } from 'react';
import Headers from '../component/Header';
import { Redirect } from 'react-router-dom';
import CardOrder from '../component/CardOrder';
import '../styles/Orders.css';
import '../styles/Card.css';
import { getUser, verifyUser } from '../service';

function Orders({ location: { pathname } }) {
  const user = getUser();
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    if (!data && isFetching === false) {
      setIsFetching(true);
      fetch('http://localhost:3001/orders',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: verifyUser(user),
          }
        }).then((response) =>
          response.json()
        ).then(result => {
          setData(result);
          setIsFetching(false);
        }).catch(() => {
          setIsError(true);
        });
    }
  }, [])
  if (!getUser()) return <Redirect to="/" />
  if (isError) return <h2>Algo deu de errado! Atualize a pagina ou volte para a pagina inicial</h2>
  return (
    <div className="Orders">
      <Headers path={`${pathname}`} />
      {!isFetching || <h2>Loading</h2>}
      {!data ||
        <div className="list-orders">
          {data.map((order, index) => <CardOrder key={`order-${order.id_order}`} index={index} att={order} />)}
        </div>
      }
      {data && data.message &&
        <h2 className="message-orders">Nenhum pedido encontrado.</h2>
      }
    </div>
  );
}

export default Orders;
