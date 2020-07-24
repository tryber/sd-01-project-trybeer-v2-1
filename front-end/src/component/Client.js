import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Client.css'
import moment from 'moment';

function Client({ data }) {
  return (
    <Link className="Client" to={`chat/${data.idClient}`}>
      <h2><span data-testid="profile-name">{data.email}</span> - <span data-testid="last-message">{moment(data.lastUpdate).format('MMMM D YYYY, h:mm:ss a')}</span></h2>
    </Link>
  )
}

export default Client;
