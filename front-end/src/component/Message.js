import React from 'react';
import moment from 'moment';
import '../styles/ItemMessage.css';

const cssMessage = (type, admin) => {
  if (type === "admin") return (admin ? 'ItemMessage admin' : 'ItemMessage user')
  return (admin ? 'ItemMessage user' : 'ItemMessage admin')
}

const authorMessage = (email, admin) => admin ? 'Loja' : email;


function ItemMessage({ att: { hour, admin, content }, type, email }) {
  return (
    <div className={cssMessage(type, admin)}>
      <div>{`${moment(hour).format('MMMM D YYYY, h:mm:ss a')} - ${authorMessage(email, admin)}`}</div>
      <p>{content}</p>
    </div>
  );
}

export default ItemMessage;

