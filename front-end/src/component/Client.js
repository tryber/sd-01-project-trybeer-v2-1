import React from 'react';
import { Link } from 'react-router-dom';

function Client({data}) {
  console.log(data)
  return (
    <div className="Client">
      <Link to={`chat/${data.idClient}`}>
        <h2>{data.email}</h2>
      </Link>
    </div>
  )
}

export default Client;
