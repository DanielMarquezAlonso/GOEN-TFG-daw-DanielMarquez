import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PuestoCarga = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [disponible, setDisponible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));
  const [redirectUrl, setRedirectUrl] = useState('');
  const location = useLocation();
  const nombreEstacion = location.state && location.state.nombreEstacion;

  useEffect(() => {
    retrieveContent();
  }, [nombreEstacion]);

  const retrieveContent = () => {
    axios
      .get(`http://127.0.0.1:8000/estacion/${nombreEstacion}/puestocarga/`)
      .then(response => {
        setData(response.data);
        // console.log(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleLogoutClick = () => {
    sessionStorage.setItem('isLoggedIn', false);
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  };

  const handlePuestoCargaClick = (puestoCarga) => {
    if (!puestoCarga.disponible) {
      return; // 
    } else {
      // console.log(puestoCarga.numeroPuesto);
      setRedirectUrl(`/puestoCarga/alquiler/${encodeURIComponent(puestoCarga.numeroPuesto)}`);
    }
  };

  if (!data || data.length === 0) {
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
      {redirectUrl ? (
        <Navigate to={redirectUrl} replace />
      ) : (
        sessionStorage.getItem('isLoggedIn') && sessionStorage.getItem('isLoggedIn') !== 'false' ? (
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
                  <Link to="/profile">Perfil</Link>
                </ul>
              </nav>
            </header>
            <h1>{nombreEstacion}</h1>
            <h2>Puestos de Carga</h2>
            <div className='grid-container'>
              {data.map((puestoCarga, index) => (
                <div
                  key={index}
                  className={`grid-item ${puestoCarga.disponible ? 'green' : 'red'}`}
                  onClick={() => handlePuestoCargaClick(puestoCarga)}
                >
                  <p>{puestoCarga.puesto}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Navigate to='/home' replace />
        )
      )}
    </>
  );
};

export default PuestoCarga;

