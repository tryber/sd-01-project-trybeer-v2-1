import React, { useState, useEffect } from 'react';
import '../styles/Forms.css'

const filterFieldsInvalid = (inputs) => {
  const invalidValues = Object.entries(inputs).filter((field) => field[1] === false);
  return Object.values(invalidValues).map((key) => key[0]);
}

const submitValues = ({ address, addressNumber, setIsValid }) => {
  const inputs = {};
  inputs.address = address.length > 0;
  inputs.addressNumber = /^[0-9]{1,10}$/.test(addressNumber);
  const validate = filterFieldsInvalid(inputs);
  if (validate.length > 0) return setIsValid({ status: false, invalid: validate });
  return setIsValid({ status: true, invalid: [] });
}

const divInput = (type, onChange) => {
  if (type === 'number') return (
    <div>
      <label htmlFor="house-number-input" className="lbl">Número da Casa:</label><input className="ipt" id="house-number-input" type="text" data-testid="checkout-house-number-input" onChange={e => onChange(e.target.value)} />
    </div>
  )
  return (
    <div>
      <label htmlFor="street" className="lbl">Rua:</label><input id="street" type="text" className="ipt" data-testid="checkout-street-input" onChange={e => onChange(e.target.value)} />
    </div>
  )
}

function FormCheckout({ getValues, valid }) {
  const [address, setAddress] = useState();
  const [addressNumber, setAddressNumber] = useState();
  const [isValid, setIsValid] = useState({ status: false, invalid: [] });
  useEffect(() => {
    if (isValid.status) {
      getValues({ address, addressNumber });
      setIsValid({ status: false, invalid: [] });
    }
  }, [isValid.status]);
  return (
    <div className="forms-checkout">
      <h2>Endereço</h2>
      <div className="inputs">
        <div className="input-checkout">
          {divInput('street', setAddress)}
        </div>
        <div className="input-checkout">
          {divInput('number', setAddressNumber)}
        </div>
        <input type="button" className="btn" disabled={valid || !address || !addressNumber} value="Finalizar Pedido" data-testid="checkout-finish-btn" onClick={() => submitValues({ address, addressNumber, setIsValid })} />
        {isValid.status || isValid.invalid.length === 0 || <div><h3 data-testid="invalid">{isValid.invalid.reduce((acc, field) => `${acc} ${field}`, 'Campos Inválidos:')}</h3></div>}
      </div>
    </div>
  );
}

export default FormCheckout;
