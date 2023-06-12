import React, { useState } from 'react';
import { withRouter, useHistory, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './login.scss'

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
        console.log(username)
        const data = await response.json();
        console.log(data)

        const token = data.token;


        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('token', token);

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
    <div className='portada'>
        <header>
          <nav>
              <h1>GOEN</h1>
          </nav>
        </header>
        
        <div className="login-form-container">
      <h2 style={{ color: 'black' }}>Iniciar sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <input
          className="input-field"
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default LoginForm;