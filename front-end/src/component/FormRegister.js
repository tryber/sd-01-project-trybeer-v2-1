import React, { useState, useEffect } from 'react';
import InvalidFields from './InvalidFields';
import '../styles/Forms.css';

const filterFieldsInvalid = (inputs) => {
  const invalidValues = Object.entries(inputs).filter((field) => field[1] === false);
  return Object.values(invalidValues).map((key) => key[0]);
}

const submitValues = ({ name, email, password, setIsValid }) => {
  const inputs = {};
  inputs.name = /^[a-zA-Z-\s]{12,40}$/.test(name);
  inputs.email = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(email);
  inputs.password = /^[0-9]{6,20}$/.test(password);
  const validate = filterFieldsInvalid(inputs)
  if (validate.length > 0) return setIsValid({ status: false, invalid: validate })
  return setIsValid({ status: true, invalid: [] });
}

function FormRegister({ getValues }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState(false);
  const [isValid, setIsValid] = useState({ status: false, invalid: [] });

  useEffect(() => {
    if (isValid.status) {
      getValues({ name, email, role, password })
      setIsValid({ status: false, invalid: [] })
    }
  }, [isValid.status])
  return (
    <div className="Forms">
      <h2>Cadastro:</h2>
      <label className="lbl" htmlFor="name">Nome:</label><input id="name" className="ipt" type="text" data-testid="signup-name" onChange={e => setName(e.target.value)} />
      <label className="lbl" htmlFor="email">Email:</label><input id="email" className="ipt" type="email" data-testid="signup-email" onChange={e => setEmail(e.target.value)} />
      <label className="lbl" htmlFor="password">Senha:</label><input id="password" className="ipt" type="password" data-testid="signup-password" onChange={e => setPassword(e.target.value)} />
      <div className="div-check">
        <input type="checkbox" id="checkbox" onClick={(e) => setRole(e.target.checked)} data-testid="signup-seller" className="ipt check" />
        <span class="check-item"></span>
        <label className="lbl lbl-check" htmlFor="checkbox">Quero vender</label>
      </div>
      <input type="button" className="btn" value="Cadastrar" data-testid="signup-btn" onClick={() => submitValues({ name, email, password, setIsValid })} />
      {isValid.status || isValid.invalid.length === 0 || <InvalidFields isValid={isValid}/>}
    </div>
  );
}

export default FormRegister;
