import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import Payment from '../payment/Payment'
import axios from 'axios';

const Alquiler = (props) => {
    const [patinetes, setPatinetes] = useState([]);
    const [puesto, setPuesto] = useState(null);
    const [contador, setContador] = useState(0);
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedPatinete, setSelectedPatinete] = useState('');
    const [precioAlquiler, setPrecioAlquiler] = useState(0);
    const [disponible, setDisponible] = useState(false);
    const [alquilerFinalizado, setAlquilerFinalizado] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));

    // const numeroPuesto = props.numeroPuesto;
    const { numeroPuesto } = useParams();


  
    useEffect(() => {
    //   fetchPatinetes();
      retrieveContent();
      retrievePuesto();
    }, [numeroPuesto]);
  
    useEffect(() => {
      let timerId;
  
      if (isRunning) {
        timerId = setInterval(() => {
          setContador((prevContador) => prevContador + 1);
        }, 1000);
      }
  
      return () => {
        clearInterval(timerId);
      };
    }, [isRunning]);
  
    const retrieveContent = async () => {

        console.log("esto es el numero de puesto", numeroPuesto)

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
  
    const retrievePuesto = () => {
        console.log("esto es el numero de puesto", numeroPuesto)

      // Lógica para obtener el puesto de carga asignado al usuario
      // Puedes hacer una petición a tu backend o asignar el puesto desde otro componente
      // const puestoAsignado = // Obtener el puesto de carga asignado al usuario
      // setPuesto(puestoAsignado);
    };
  
    const handleComenzarClick = () => {
      setIsRunning(true);
      setContador(0);
      setSelectedPatinete(selectedPatinete);
            (async () => {

        try {
          const response = await axios.put(`http://127.0.0.1:8000/puestoCarga/${numeroPuesto}/`, {
            disponible: false,
          });
      
          console.log('La disponibilidad del puesto ha sido actualizada correctamente');
        } catch (error) {
          console.error('Error al actualizar la disponibilidad del puesto', error);
        }
        })();

      // Aquí puedes realizar acciones adicionales al comenzar el alquiler, como cambiar el estado del puesto a no disponible en la base de datos

    };
  
    const handlePararClick = () => {
      setIsRunning(false);
      setAlquilerFinalizado(true)
      setTiempoTranscurrido(contador);
      // Calcular el precio al finalizar el alquiler
      console.log(selectedPatinete, "patin selec")
      console.log(patinetes, "patin ideb")
      let patineteSeleccionado = "";
        for (let i = 0; i < patinetes.length; i++) {
            let comparar = patinetes[i].identificador
            if(comparar == selectedPatinete) {
                console.log("entra")
                console.log(patinetes[i])

                patineteSeleccionado = patinetes[i];
            }           
        }
        console.log("contador", contador)
        console.log("es precio es", precioAlquiler)

        if (patineteSeleccionado) {
            const precio =
            (patineteSeleccionado.precio_minuto / 60) * contador +
            parseFloat(patineteSeleccionado.precio_desbloqueo);
            setPrecioAlquiler(precio.toFixed(2));
            console.log("es precio es", precioAlquiler)
          }
      // Aquí puedes realizar acciones adicionales al parar el alquiler, como guardar el tiempo transcurrido en la base de datos y redirigir al componente de pago
      (async () => {

        try {
          const response = await axios.put(`http://127.0.0.1:8000/puestoCarga/${numeroPuesto}/`, {
            disponible: true,
          });
      
          console.log('La disponibilidad del puesto ha sido actualizada correctamente');
        } catch (error) {
          console.error('Error al actualizar la disponibilidad del puesto', error);
        }
        })();

    };
  
    const formatTime = (seconds) => {
      // Lógica para formatear el tiempo transcurrido a un formato deseado (HH:MM:SS)
      // Puedes adaptar esta función según tus necesidades
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
  
    const handleLogoutClick = () => {
      sessionStorage.setItem('isLoggedIn', false);
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('token');
      setIsLoggedIn(false);

      // navigate('/home');
    };
  
    if (patinetes  === null) {
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
                <Link to="/profile"><p>Perfil</p></Link>

              </ul>
            </nav>
          </header>
          <div>Loading</div>
        </div>
      );
    }
  
    return (
      <>
       {isLoggedIn && isLoggedIn !== 'false' ? (
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
                  <Link to="/profile"><p>Perfil</p></Link>

                </ul>
              </nav>
            </header>
            {!alquilerFinalizado && (
              <>
            <h2>Selecciona tu patinete</h2>
            <select value={selectedPatinete} onChange={(e) => setSelectedPatinete(e.target.value)}>
              <option value=''>Seleccionar patinete</option>
              {patinetes.map((patinete) => (
                <option key={patinete.identificador} value={patinete.identificador}>
                  {patinete.identificador} - {patinete.vatios} W
                </option>
              ))}
            </select>
            {isRunning ? (
              <div>
                <p>Tiempo transcurrido: {formatTime(contador)}</p>
                <button onClick={handlePararClick}>Parar alquiler</button>
              </div>
            ) : (
              <button disabled={!selectedPatinete} onClick={handleComenzarClick}>
                Comenzar alquiler
              </button>
            )}
            
            </>
            )}
            {tiempoTranscurrido > 0 && (
              <div>
                <p>Tiempo alquilado: {formatTime(tiempoTranscurrido)}</p>
                <p>Coste total: {precioAlquiler} euros</p>
                <Payment price={precioAlquiler} /> {/* Agrega este componente */}

              </div>
            )}
          </div>
        ) : (
          <Navigate to='/home' replace />
        )}
      </>
    );
  };
  
  export default Alquiler;