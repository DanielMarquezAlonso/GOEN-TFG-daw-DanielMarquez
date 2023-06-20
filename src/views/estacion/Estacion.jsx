import React, { Suspense, lazy } from 'react';
import axios from 'axios';
import { Link  } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { handleLazyError, withRouter } from '../../storage/Settings'
import './estacion.scss'

const Settings = lazy(() => handleLazyError(() => import('../../storage/Settings')));

const SettingsWithRouter = withRouter(Settings)

class Estacion extends React.Component {
    static identifier = 'estacion';

    constructor(props) {
      super(props);
      this.state = {
        data: null,
        error: null,
        nombre: "",
        direccion: "",
        estado: false,
        selectedEstacion: null,
        seleccionado: false,
      };


    }
  
    componentDidMount() {
        this.retrieveContent();

    }
    
    retrieveContent = () => {
        axios.get('http://127.0.0.1:8000/estacion/')
      .then(response => {
        this.setState({ data: response.data });
        // console.log(response.data)
 

      })
      .catch(error => {
        this.setState({ error: error.message });
      });;

      
    }

    handleLogoutClick = () => {
      sessionStorage.setItem('isLoggedIn', false);
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('token');
      this.setState({ isLoggedIn: false });
      
      
    };
    handleEstacionClick = (estacion) => {
      if (!estacion.estado) {
        return; 
      }else{
        // console.log(estacion.nombre)
        let seleccion = estacion.nombre;
        this.setState({nombre: seleccion})
        // console.log("nombre de la estacion")
        // console.log(this.state.nombre)
        return <Navigate to={`/puestoCarga/${encodeURIComponent(estacion.nombre)}`} replace />;

      }
    
      };

    render() {
      if (this.state.nombre !== "") {
        const { nombre } = this.state;
        const nombreEstacion = nombre;
        // console.log(nombreEstacion)
        return <Navigate to={`/puestoCarga/${nombreEstacion}`} replace state={{ nombreEstacion: nombre }} />;

      }
      const { data, error, estado, seleccionado } = this.state;
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');


      if (!data || data.length === 0) {
        return (<div className='portada'>
        <header>
          <nav>
            <ul>
              <h1>GOEN</h1>
              <li>
                <Link to='/home'>Home</Link>
              </li>
              <li>
                  <button onClick={this.handleLogoutClick}>Logout</button>
                </li>
            </ul>
          </nav>
        </header>
        <div>Loading</div>
        </div>);
      }

      let squareColor = '';
      if (estado) {
        squareColor = 'green';
      } else {
        squareColor = 'red';
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
                  <button onClick={this.handleLogoutClick}>Logout</button>
                </li>
                <Link to="/profile"><p>Perfil</p></Link>

            </ul>
          </nav>
        </header>
        <h1>Estaciones</h1>
 
        <div className='grid-container'>
          {data.map((estacion, index) => (
            <div
              key={index}
              className={`grid-item ${estacion.estado ? 'green' : 'red'}`}
              onClick={() => this.handleEstacionClick(estacion)}>
              <p>{estacion.nombre}</p>
              <p>{estacion.direccion}</p>
              
            </div>
           
          ))}
        </div>
      </div>
    ) : (
      <Navigate to="/home" replace />

    )}
      </>
      );
  
   
    }
  }
  

export default Estacion;
