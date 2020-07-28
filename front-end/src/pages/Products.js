import React, { useContext, useState } from 'react';
import Headers from '../component/Header';
import useAxios from 'axios-hooks';
import { TrybeerContext } from '../context';
import CardProduct from '../component/CardProduct';
import '../styles/CardProduct.css';
import '../styles/Card.css';
import { Redirect } from 'react-router-dom';
import { getUser, verifyUser } from '../service';

const verifyEmptyCar = total => total === 0 || total === "0.00";

function Products({ location: { pathname } }) {
  const user = getUser();
  const { carBuyer } = useContext(TrybeerContext);
  const [done, setDone] = useState(false);
  const [{ data, loading, error }] = useAxios({
    url: `http://localhost:3001/products`,
    method: 'GET',
    headers: { authorization: verifyUser(user) }
  })
  if (!getUser()) return <Redirect to="/" />
  if (error) return <h2>Algum erro aconteceu!</h2>
  if (done) return <Redirect to="/checkout" />
  return (
    <div className="Products">
      <Headers path={`${pathname}`} />
      {loading && <h2>Loading</h2>}
      {!loading &&
        <div className="list-products">
          {data.map((product, index) => <CardProduct key={`product-${product.id_product}`} index={index} attributes={product} />)}
          <button type="button" className="btn-checkout" data-testid="checkout-bottom-btn"
            disabled={verifyEmptyCar(carBuyer.total)} onClick={() => setDone(true)}
          >
            Ver carrinho<span data-testid="checkout-bottom-btn-value">{`R$ ${carBuyer.total}`}</span>
          </button>
        </div>
      }
    </div>
  );
}

export default Products;
