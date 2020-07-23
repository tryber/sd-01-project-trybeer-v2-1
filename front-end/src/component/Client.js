import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Client.css'

function Client({ data }) {
  return (
    <Link className="Client" to={`chat/${data.idClient}`}>
        <h2>{data.email}</h2>
    </Link>
  )
}

export default Client;
