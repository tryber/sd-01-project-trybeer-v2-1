import React from 'react';
import moment from 'moment';
import '../styles/ItemMessage.css';

const authorMessage = (type, admin) => {
  if (type==="admin") return admin ? 'Você.' : 'Cliente.'
  return admin ? 'Loja.' : 'Você.'
}

function ItemMessage({ att: { hour, admin, content }, type }) {
  return (
    <div className={(admin ? 'ItemMessage user' : 'ItemMessage admin')}>
      <div>{`${moment(hour).format('MMMM Do YYYY, h:mm:ss a')} - ${authorMessage(type, admin)}`}</div>
      <p>{content}</p>
    </div>
  );
}

export default ItemMessage;

