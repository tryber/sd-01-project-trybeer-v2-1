import React, { useState, useContext } from 'react';
import Headers from '../component/Header';
import { TrybeerContext } from '../context';
import { fetchApi } from '../service/serviceFetch';
import ReportComponent from '../component/ReportComponent';
import { getUser } from '../service';
import { clearCar, verifyCarBuyer } from '../service/CarBuyer';
import '../styles/Checkout.css';
import ListCar from '../component/ListCar';
import FormCheckout from '../component/FormCheckout';
import { Redirect } from 'react-router-dom';

async function handleSubmit(obj, setMessageRequest, orders, setCarBuyer, setFinish) {
  const { address, addressNumber } = obj;
  const body = {
    address,
    addressNumber,
    orders
  };
  const data = await fetchApi({
    endpoint: 'http://localhost:3001/checkout',
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      authorization: getUser().token,
    }
  });
  console.log(data.message)
  setMessageRequest((data.message));
  if (data.message === "Order successfully placed") {
    clearCar();
    verifyCarBuyer(setCarBuyer);
  }
}

function Checkout() {
  const { carBuyer, setCarBuyer } = useContext(TrybeerContext);
  const [messageRequest, setMessageRequest] = useState();
  const [finish, setFinish] = useState(false);
  if (finish) return <Redirect to="/products" />
  return (
    <div className="Checkout">
      <Headers path="/checkout" />
      <div className="body-checkout">
        {!carBuyer || carBuyer.list.length === 0 || <ListCar car={carBuyer} />}
        {carBuyer && carBuyer.list.length === 0 && <h2>Carrinho vazio</h2>}
        {!carBuyer || carBuyer.list.length === 0 || <FormCheckout getValues={(obj) => { handleSubmit(obj, setMessageRequest, carBuyer.list, setCarBuyer, setFinish) }} valid={carBuyer.list.length === 0} />}
        {!messageRequest || <ReportComponent message={{ messageRequest, setMessageRequest }} callback={() => setFinish(true)} />}
      </div>
    </div>
  );
}

export default Checkout;
