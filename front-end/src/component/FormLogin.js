import React, { useState, useEffect } from 'react';
import InvalidFields from './InvalidFields';
import '../styles/Forms.css';

const filterFieldsInvalid = (inputs) => {
  const invalidValues = Object.entries(inputs).filter((field) => field[1] === false);
  return Object.values(invalidValues).map((key) => key[0]);
}

const submitValues = ({ email, setIsValid }) => {
  const inputs = {};
  inputs.email = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(email);
  const validate = filterFieldsInvalid(inputs);
  if (validate.length > 0) return setIsValid({ status: false, invalid: validate });
  return setIsValid({ status: true, invalid: [] });
}

function FormLogin({ getValues }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isValid, setIsValid] = useState({ status: false, invalid: [] });
  useEffect(() => {
    if (isValid.status) {
      getValues({ email, password });
      setIsValid({ status: false, invalid: [] });
    }
  }, [isValid.status]);
  return (
    <div className="Forms">
      <h2>Login</h2>
      <label className="lbl" htmlFor="email">Email:</label><input className="ipt" id="email" type="email" data-testid="email-input" onChange={e => setEmail(e.target.value)} />
      <label className="lbl" htmlFor="password">Senha:</label><input id="password" className="ipt" type="password" data-testid="password-input" onChange={e => setPassword(e.target.value)} />
      <input type="button" className="btn" value="Entrar" data-testid="signin-btn" onClick={() => submitValues({ email, password, setIsValid })} />
      {isValid.status || isValid.invalid.length === 0 || <InvalidFields isValid={isValid}/>}
    </div>
  );
}

export default FormLogin;
