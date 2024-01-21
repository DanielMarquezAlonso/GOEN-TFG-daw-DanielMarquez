import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));
  const [isStaff, setIsStaff] = useState(sessionStorage.getItem('isStaff'));
  const [estaciones, setEstaciones] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [puestosCarga, setPuestosCarga] = useState([]);

  const [nuevaEstacion, setNuevaEstacion] = useState({
    nombre: '',
    direccion: '',
    estado: false,
  });
  const [nuevoPuesto, setNuevoPuesto] = useState({
    numeroPuesto: '',
    estacion: '',
    puesto: '',
    disponible: true,
  });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('estaciones'); 
  const [data, setData] = useState([]);
  const [nombreEstacion, setNombreEstacion] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchEstaciones();
      fetchRegistros();
    }
  }, [isLoggedIn]);

  const fetchEstaciones = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/estacion/', {
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        setEstaciones(response.data);
      } else {
        throw new Error('Error al obtener las estaciones');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRegistros = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/registro/', {
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRegistros(data);
      } else {
        throw new Error('Error al obtener los registros');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleInputChange = (e) => {
    if (activeTab === 'estaciones') {
      setNuevaEstacion({
        ...nuevaEstacion,
        [e.target.name]: e.target.value,
      });
    } else if (activeTab === 'puestosCarga') {
      setNuevoPuesto({
        ...nuevoPuesto,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmitEstacion = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/estacion/', nuevaEstacion, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      if (response.status === 201) {
        fetchEstaciones();
        setNuevaEstacion({
          nombre: '',
          direccion: '',
          estado: false,
        });
      } else {
        throw new Error('Error al crear la estación');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitPuesto = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/puestoCarga/', nuevoPuesto, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      if (response.status === 201) {
        fetchPuestosCarga();
        setNuevoPuesto({
          numeroPuesto: '',
          estacion: '',
          puesto: '',
          disponible: true,
        });
      } else {
        throw new Error('Error al crear el puesto de carga');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEstacion = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/estacion/${id}/`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      if (response.status === 204) {
        fetchEstaciones();
      } else {
        throw new Error('Error al eliminar la estación');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePuesto = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/puestoCarga/${id}/`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      if (response.status === 204) {
        fetchPuestosCarga();
      } else {
        throw new Error('Error al eliminar el puesto de carga');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabChange = (tab) => {
    if (tab === 'puestosCarga') {
      fetchPuestosCarga();
    }
    setActiveTab(tab);
  };

  const handleChargingPostsClick = async (nombreEstacion) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/estacion/${nombreEstacion}/puestocarga/`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        setPuestosCarga(response.data);
        setActiveTab('puestosCarga');
      } else {
        throw new Error('Error al obtener los puestos de carga');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPuestosCarga = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/puestoCarga/', {
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        setPuestosCarga(response.data);
      } else {
        throw new Error('Error al obtener los puestos de carga');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return isLoggedIn && isLoggedIn && isStaff  !== 'false' ? (
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
        <div className='toggle-buttons'>
          <button
            className={activeTab === 'estaciones' ? 'active' : ''}
            onClick={() => handleTabChange('estaciones')}
          >
            Estaciones
          </button>
          <button
            className={activeTab === 'historial' ? 'active' : ''}
            onClick={() => handleTabChange('historial')}
          >
            Historial
          </button>
          <button
            className={activeTab === 'puestosCarga' ? 'active' : ''}
            onClick={() => handleTabChange('puestosCarga')}
          >
            Puestos de Carga
          </button>
        </div>
        {activeTab === 'estaciones' && (
          <>
            <h2>Estaciones</h2>
            <form onSubmit={handleSubmitEstacion}>
              <input
                type='text'
                placeholder='Nombre'
                name='nombre'
                value={nuevaEstacion.nombre}
                onChange={handleInputChange}
              />
              <input
                type='text'
                placeholder='Dirección'
                name='direccion'
                value={nuevaEstacion.direccion}
                onChange={handleInputChange}
              />
              <label>
                Estado:
                <input
                  type='checkbox'
                  name='estado'
                  checked={nuevaEstacion.estado}
                  onChange={handleInputChange}
                />
              </label>
              <button type='submit'>Crear estación</button>
            </form>
            {error && <p>{error}</p>}
            <ul>
              {estaciones.map((estacion) => (
                <li key={estacion.id}>
                  <p>Nombre: {estacion.nombre}</p>
                  <p>Dirección: {estacion.direccion}</p>
                  <p>Estado: {estacion.estado ? 'true' : 'false'}</p>
                  <button onClick={() => handleDeleteEstacion(estacion.nombre)}>Eliminar</button>
                  <button onClick={() => handleChargingPostsClick(estacion.nombre)}>Puestos de carga</button>
                </li>
              ))}
            </ul>
          </>
        )}
        {activeTab === 'historial' && (
          <>
            <h2>Historial</h2>
            {registros.map((registro) => (
              <div className='historial' key={registro.id}>
                <h2>Datos del Pago:</h2>
                <p>
                  <span className='label'>Usuario:</span> {registro.usuario}

                </p>
                <p>
                  <span className='label'>ID de Compra:</span> {registro.id_pago}
                </p>
                <p>
                  <span className='label'>Fecha:</span> {registro.fecha_alquiler}
                </p>
                <p>
                  <span className='label'>Importe:</span> {registro.precio_total}€
                </p>
                <p>
                  <span className='label'>Estado:</span> {registro.estado_pago}
                </p>
              </div>
            ))}
          </>
        )}
        {activeTab === 'puestosCarga' && (
          <>
            <h2>Puestos de Carga</h2>
            <form onSubmit={handleSubmitPuesto}>
              <input
                type='text'
                placeholder='Número de Puesto'
                name='numeroPuesto'
                value={nuevoPuesto.numeroPuesto}
                onChange={handleInputChange}
              />
              <input
                type='text'
                placeholder='Estación'
                name='estacion'
                value={nuevoPuesto.estacion}
                onChange={handleInputChange}
              />
              <input
                type='text'
                placeholder='Puesto'
                name='puesto'
                value={nuevoPuesto.puesto}
                onChange={handleInputChange}
              />
              <label>
                Disponible:
                <input
                  type='checkbox'
                  name='disponible'
                  checked={nuevoPuesto.disponible}
                  onChange={handleInputChange}
                />
              </label>
              <button type='submit'>Crear puesto de carga</button>
            </form>
            {error && <p>{error}</p>}
            <ul>
              {puestosCarga.map((puesto) => (
                <li key={puesto.id}>
                  <p>Número de Puesto: {puesto.numeroPuesto}</p>
                  <p>Estación: {puesto.estacion}</p>
                  <p>Puesto: {puesto.puesto}</p>
                  <p>Disponible: {puesto.disponible ? 'true' : 'false'}</p>
                  <button onClick={() => handleDeletePuesto(puesto.numeroPuesto)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  ) : (
    <Navigate to='/home' />
  );
};

export default Admin;


