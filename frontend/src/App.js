import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import LoginForm from './LoginForm';
import MainMenu from './MainMenu';

const getToken = () => localStorage.getItem('access_token');

const PrivateRoute = ({ children }) => {
  return getToken() ? children : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token && !user) {
      axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [user]);

  const handleLogin = (data) => {
    localStorage.setItem('access_token', data.access_token);
    setUser(data.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/" /> : <LoginForm onLogin={handleLogin} />
          } />
          <Route path="/" element={
            <PrivateRoute>
              <MainMenu onLogout={handleLogout} />
              <h2>Bienvenido, {user?.name}</h2>
            </PrivateRoute>
          } />
          {/* Rutas protegidas de ejemplo */}
          <Route path="/catalogo" element={<PrivateRoute><div>Catálogo</div></PrivateRoute>} />
          <Route path="/carrito" element={<PrivateRoute><div>Carrito</div></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><div>Perfil</div></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
