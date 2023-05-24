import React, { useState } from 'react';
import { withRouter, useHistory, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('isLoggedIn', true);
        console.log(data.message);
        // Realizar acciones adicionales después del inicio de sesión exitoso
        navigate('/home'); // Redirigir al componente "Home"
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Ocurrió un error al iniciar sesión.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;