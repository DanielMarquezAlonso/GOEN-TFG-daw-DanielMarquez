import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './estacion.scss'

class Estacion extends React.Component {
    static identifier = 'estacion';
  
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        error: null,
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

    render() {
      const { data, error } = this.state;
      console.log("esto es data")

      if (!data || data.length === 0) {
        return <div>Loading</div>;
      }

      console.log(data[2].nombre)
    
      return (
        
        <div className='portada'>
            <header>
            <nav>
            <ul>
            <h1>GOEN</h1>
            <li><Link to="/home">Home</Link></li>
            <li><button>Login</button></li>


          </ul>
        </nav>
        </header>
          <h1>Estaciones</h1>
          <p>{JSON.stringify(data)}</p>
          <p>Nombre de la primera estación: {data[0].nombre}</p>
        </div>
      );
  
    //   return (
    //     <div>
    //       <h1>Estaciones</h1>
    //       <p>{JSON.stringify(data)}</p>
    //     </div>
    //   );
    }
  }
  

export default Estacion;


  // axios.get('http://127.0.0.1:8000/')
    //   .then(response => {
    //     this.setState({ data: response.data });
    //     console.log(response)

    //   })
    //   .catch(error => {
    //     this.setState({ error: error.message });
    //   });;