import React from 'react';
import '../styles/ReportComponent.css';

const verifyStatusMessage = (message) => {
  const obj = {
    'Invalid Fields': 'stay',
    'The email already registered': 'stay',
    'Registered successfully.': 'redirect',
    'Update Success': 'stay',
    'Atualizado com sucesso': 'stay',
    'Invalid name': 'stay',
    'Order successfully placed': 'redirect-product',
  }
  return obj[message];
}

function ReportComponent({ message, callback }) {
  const { messageRequest, setMessageRequest } = message;
  setTimeout(() => {
    if (verifyStatusMessage(messageRequest) === 'stay') return setMessageRequest();
    if (callback) callback(true);
  }, 3000);
  return (
    <div className="ReportComponent">
      <div data-testid="message-report" className={`text-report ${verifyStatusMessage(messageRequest)}`}>
        <h2>{messageRequest}</h2>
        {verifyStatusMessage(messageRequest) === 'redirect' && <h3>Redirecionando para pagina de login</h3>}
        {verifyStatusMessage(messageRequest) === 'redirect-product' && <h3>Mudando para pagina de produtos!</h3>}
      </div>
    </div>
  );
}

export default ReportComponent;
