import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './profile.scss'
import axios from 'axios';


const Profile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [patinetes, setPatinetes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [vatios, setVatios] = useState('');

  useEffect(() => {
    retrieveContent();
    fetchPatinetes();
  }, []);

  const retrieveContent = () => {
    let username = sessionStorage.getItem('username');
    axios
      .get(`http://127.0.0.1:8000/profile/`)
      .then((response) => {
        const userData = response.data.find((user) => user.username === username);
        setData(userData);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const fetchPatinetes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/patinetes/', {
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPatinetes(data);
      } else {
        throw new Error('Error al obtener los patinetes');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createPatinete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/patinetes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          // nombre,
          vatios,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setNombre('');
        setVatios('');
        setPatinetes([...patinetes, data]);
        console.log('Patinete creado con éxito');
      } else {
        throw new Error('Error al crear el patinete');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePatinete = async (identificador) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/patinetes/${identificador}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setPatinetes(patinetes.filter((patinete) => patinete.identificador !== identificador));
        console.log('Patinete eliminado con éxito');
      } else {
        throw new Error('Error al eliminar el patinete');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    // navigate('/home');
  };

  if (patinetes && data === null) {
    return (
      <div className='portada'>
        <header>
          <nav>
            <ul>
              <h1>GOEN</h1>
              <li>
                <Link to='/home'>Home</Link>
              </li>
              <li>
                <Link to='/estacion'>Estaciones</Link>
              </li>
              <li>
                <button onClick={handleLogoutClick}>Logout</button>
              </li>
            </ul>
          </nav>
        </header>
        <div>Loading</div>
      </div>
    );
  }

  return (
    <>
      {sessionStorage.getItem('isLoggedIn') && sessionStorage.getItem('isLoggedIn') !== 'false' ? (
        <div className='portada'>
          <header>
            <nav>
              <ul>
                <h1>GOEN</h1>
                <li>
                  <Link to='/home'>Home</Link>
                </li>
                <li>
                  <Link to='/estacion'>Estaciones</Link>
                </li>
                <li>
                  <button onClick={handleLogoutClick}>Logout</button>
                </li>
              </ul>
            </nav>
          </header>
          <div className='profile-container'>
            <h1>Perfil</h1>
            <p>Usuario: {data.username}</p>
            <p>Teléfono: {data.telefono}</p>
            <p>Correo: {data.email}</p>
            <p>{data.dni}</p>

            <h2>Mis patinetes</h2>
            <ul>
              {patinetes.map((patinete) => (
                <li key={patinete.id}>
                  ID: {patinete.identificador} - {patinete.vatios}W
                  <button onClick={() => deletePatinete(patinete.identificador)}>Eliminar</button>
                </li>
              ))}
            </ul>

            <h2>Registrar patinete</h2>
            <form onSubmit={createPatinete}>
              {/* <input
                type='text'
                placeholder='Nombre'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              /> */}
              <input
                type='number'
                placeholder='Vatios'
                value={vatios}
                onChange={(e) => setVatios(e.target.value)}
              />
              <button type='submit'>Crear</button>
            </form>
          </div>
        </div>
      ) : (
        <Navigate to='/home' replace />
      )}
    </>
  );
};

export default Profile;

