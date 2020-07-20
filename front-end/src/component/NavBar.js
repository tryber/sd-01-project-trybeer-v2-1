import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { clearUser } from '../service';
import '../styles/NavBar.css';

const logout = (callback) => {
  clearUser();
  callback(true);
};

const linksCliente = (setOut) => (
  <div className="NavBar">
    <div className="links">
      <Link to="/products" className="nav-link" data-testid="side-menu-item-products">Produtos</Link>
      <Link to="/orders" className="nav-link" data-testid="side-menu-item-my-orders">Meus pedidos</Link>
      <Link to="/profile" className="nav-link" data-testid="side-menu-item-my-profile">Meu Perfil</Link>
    </div>
    <input className="checkout" type="button" data-testid="side-menu-item-logout" value="Sair" onClick={() => logout(setOut)} />
  </div>
);

function NavBar({ type }) {
  const [out, setOut] = useState(false);
  if (out) return <Redirect to="/" />
  if (type === 'cliente') return linksCliente(setOut);
  return (
    <div className="NavBar admin top-nav-bar">
      <h2>Trybeer</h2>
      <div className="links">
        <Link to="/admin/orders" className="nav-link" data-testid="side-menu-item-orders">Pedidos</Link>
        <Link to="/admin/profile" className="nav-link" data-testid="side-menu-item-profile">Perfil</Link>
      </div>
      <input className="checkout" type="button" data-testid="side-menu-item-logout" value="Sair" onClick={() => logout(setOut)} />
    </div>
  );
}

export default NavBar;
