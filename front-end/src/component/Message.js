import React from 'react';
import moment from 'moment';

function ItemMessage({ att: { hour, admin, content } }) {
  return (
    <div className={(admin ? 'Message admin' : 'Message user')}>
      <div>{`${moment(hour).format('MMMM Do YYYY, h:mm:ss a')}`}</div>
      <p>{content}</p>
    </div>
  );
}

export default ItemMessage;
