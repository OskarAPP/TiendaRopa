import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = ({ onLogout }) => (
  <nav>
    <ul>
      <li><Link to="/catalogo">Catálogo</Link></li>
      <li><Link to="/carrito">Carrito</Link></li>
      <li><Link to="/perfil">Perfil</Link></li>
      <li><button onClick={onLogout}>Cerrar sesión</button></li>
    </ul>
  </nav>
);

export default MainMenu;
