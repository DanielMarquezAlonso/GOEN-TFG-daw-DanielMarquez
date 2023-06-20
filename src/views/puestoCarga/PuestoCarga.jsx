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
        console.log(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleLogoutClick = () => {
    sessionStorage.setItem('isLoggedIn', false);
    console.log('logout');
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  };

  const handlePuestoCargaClick = (puestoCarga) => {
    if (!puestoCarga.disponible) {
      return; // No se hace nada si el estado es falso
    } else {
      console.log(puestoCarga.numeroPuesto);
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
                  <Link to="/profile"><p>Perfil</p></Link>
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


////////////////////////

// import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Navigate } from "react-router-dom";

// import './puestoCarga.scss'
// import Estacion from '../estacion/Estacion';

// class PuestoCarga extends React.Component {
//     static identifier = 'puestoCarga';

//     constructor(props) {
//       super(props);
//       this.state = {
//         data: null,
//         error: null,
//         estacion: "",
//         direccion: "",
//         disponible: false,
//       };

//     }
  
//     componentDidMount() {
//         this.retrieveContent();
//         const { nombreEstacion } = this.props;
//         console.log(nombreEstacion);         

//     }
    
//     retrieveContent = () => {
//       // const { nombreEstacion } = this.props.match.params;
//       // const estacionNombre = decodeURIComponent(nombreEstacion);
//       // axios.get('http://127.0.0.1:8000/estacion/${estacionNombre}/puestocarga/')

//         axios.get('http://127.0.0.1:8000/estacion/San%20Bernardo/puestocarga/')
//       .then(response => {
//         this.setState({ data: response.data });
//         console.log(response.data)

//       })
//       .catch(error => {
//         this.setState({ error: error.message });
//       });;
//     }

//     handleLogoutClick = () => {
//       sessionStorage.setItem('isLoggedIn', false);
//       // this.dispatch({ type: 'SET_LOGGED_IN_STATUS', payload: { isLoggedIn: false } });
//       console.log('logout');
//       this.setState({ isLoggedIn: false });
//       // const history = useHistory();
//       // history.push('/home');
      
//     };

//     render() {
      
//       const { data, error, disponible } = this.state;
//       const isLoggedIn = sessionStorage.getItem('isLoggedIn');

//       console.log("esto es puesto de carga", isLoggedIn)

//       if (!data || data.length === 0) {
//         return (<div className='portada'>
//         <header>
//           <nav>
//             <ul>
//               <h1>GOEN</h1>
//               <li>
//                 <Link to='/home'>Home</Link>
//               </li>
//               <li>
//                   <button onClick={this.handleLogoutClick}>Logout</button>
//                 </li>
//             </ul>
//           </nav>
//         </header>
//         <div>Loading</div>
//         </div>);
//       }

//       let squareColor = '';
//       if (disponible) {
//         squareColor = 'green';
//       } else {
//         squareColor = 'red';
//       }

//       // console.log(data[2].nombre)
    
//       return (
//         <>
//        {isLoggedIn && isLoggedIn !== 'false' ? (
//       <div className='portada'>
//         <header>
//           <nav>
//             <ul>
//               <h1>GOEN</h1>
//               <li>
//                 <Link to='/home'>Home</Link>
//               </li>
//               <li>
//                   <button onClick={this.handleLogoutClick}>Logout</button>
//                 </li>
//             </ul>
//           </nav>
//         </header>
//         <h1>Puestos de Carga</h1>
//         {/* <p>{JSON.stringify(data)}</p>
//         <p>Nombre de la primera estación: {data[0].nombre}</p> */}
//         <div className='grid-container'>
//           {data.map((puestoCarga, index) => (
//             <div
//               key={index}
//               className={`grid-item ${puestoCarga.disponible ? 'green' : 'red'}`}
//             >
//               <p>{puestoCarga.puesto}</p>
//               {/* <p>{puestoCarga.direccion}</p> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     ) : (
//       <Navigate to="/home" replace />

//     )}
//       </>
//       );
  
   
//     }

// }


// export default PuestoCarga;