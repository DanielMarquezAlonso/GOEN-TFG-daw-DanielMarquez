import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";

import './estacion.scss'

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
      };


    }
  
    componentDidMount() {
        this.retrieveContent();

    }
    
    retrieveContent = () => {
        axios.get('http://127.0.0.1:8000/estacion/')
      .then(response => {
        this.setState({ data: response.data });

      })
      .catch(error => {
        this.setState({ error: error.message });
      });;
    }

    handleLogoutClick = () => {
      sessionStorage.setItem('isLoggedIn', false);
      // this.dispatch({ type: 'SET_LOGGED_IN_STATUS', payload: { isLoggedIn: false } });
      console.log('logout');
      this.setState({ isLoggedIn: false });
      // const history = useHistory();
      // history.push('/home');
      
    };

    render() {
      
      const { data, error, estado } = this.state;
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');


      console.log("esto ES ESTACION", isLoggedIn)

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

      // console.log(data[2].nombre)
    
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
            </ul>
          </nav>
        </header>
        <h1>Estaciones</h1>
        {/* <p>{JSON.stringify(data)}</p>
        <p>Nombre de la primera estación: {data[0].nombre}</p> */}
        <div className='grid-container'>
          {data.map((estacion, index) => (
            <div
              key={index}
              className={`grid-item ${estacion.estado ? 'green' : 'red'}`}
            >
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
