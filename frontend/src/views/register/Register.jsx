import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.scss'


const RegisterForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !email || !telefono || !confirmPassword) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
          telefono,
          confirm_password: confirmPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Registro exitoso
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Ocurrió un error al registrar.');
    }
  };

  return (
    <div className='portada'>
      <header>
        <nav>
          <h1>GOEN</h1>
        </nav>
      </header>

      <div className="register-form-container">
        <h2 style={{ color: 'black' }}>Registro</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            className="input-field"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="email"
            className="input-field"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
         
          <input
            type="tel"
            className="input-field"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <button type="submit" className="register-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;