import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './home.scss';

class Home extends Component {
  static identifier = 'home';

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: sessionStorage.getItem('isLoggedIn'),
      usuario: "",
      
    };
  }

  

  handleLogoutClick = () => {
    sessionStorage.setItem('isLoggedIn', false);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn, usuario } = this.state;
    let username = "";
    if(usuario === ""){
      username = sessionStorage.getItem('username')
    }

    return (
      <div className="portada">
        <header>
          <nav>
            <ul>
              <h1>GOEN</h1>
              
              {isLoggedIn && isLoggedIn !== 'false' ? (
                <>
                <li>
                <Link to="/estacion">Estaciones</Link>
              </li>
                <li>
                  <button onClick={this.handleLogoutClick}>Logout</button>
                </li>
                </>
              ) : (
                <>
                <li>
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                </li>
                <li>
                <Link to="/register">
                  <button>Register</button>
                </Link>
                </li>
                </>
              )}
 
              {isLoggedIn && isLoggedIn !== 'false' ? (
                <Link to="/profile"><p>Bienvenido, {username}</p></Link>
                

              ) : (
                <p>Inicia sesión para ver contenido personalizado</p>
              )}
            </ul>
          </nav>
        </header>
          {isLoggedIn  === 'true' ? (
                  <h1>Bienvenido a GOEN</h1>
          ) : (
                  <div className="descripcion">
                  <p>¡Únete a nuestra comunidad para cargar tu patinete!</p>
                  <Link to="/register">
                    <button>Unete</button>
                  </Link></div>
          )}

        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div className='contenido'><p>Bienvenido a nuestra página web de carga de patinetes eléctricos,
           donde hacemos que la carga de tus patinetes sea más fácil y conveniente que nunca. Nos 
           enorgullece ofrecer un servicio de carga de alta calidad que está diseñado para ahorrar tiempo 
           y energía a nuestros usuarios.
           <br/><br/>
          En nuestra página web, puedes cargar tu patinete eléctrico en cualquier momento y en cualquier lugar.
          Nuestro servicio de carga está diseñado para ser flexible y adaptarse a tu horario y necesidades, 
          lo que significa que puedes cargar tu patinete mientras estás en el trabajo, en casa, o en cualquier otro lugar.
          <br/><br/>
          Además de la carga, nuestra página web también proporciona información sobre el estado de carga de tu 
          patinete y su ubicación. Esto te permitirá saber cuándo tu patinete estará listo para su uso y dónde 
          se encuentra en todo momento.
          <br/><br/>
          Nos aseguramos de que nuestro servicio de carga sea seguro y confiable. Trabajamos con proveedores 
          de carga de patinetes de confianza que utilizan tecnología de carga de alta calidad para garantizar
          que tu patinete esté completamente cargado y listo para su uso.
          <br/><br/>  
          En resumen, nuestra página web de carga de patinetes eléctricos es la solución perfecta para 
          simplificar el proceso de carga de tus patinetes. No importa si eres un usuario ocasional o un
          usuario frecuente de patinetes eléctricos, estamos aquí para hacer que la carga de tus patinetes
          sea más fácil y conveniente que nunca. ¡Prueba nuestro servicio hoy mismo y experimenta la comodidad
          de tener tu patinete siempre listo para rodar!</p>
          </div>
          <div className='pie'>
            <h4>Daniel Marquez Alonso</h4>
            <p>Todos los derechos reservados &copy; 2023</p>
          </div>
            
      </div>
    );
  }
}

export default Home;


//Functional component

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './home.scss';
// import { handleLogout } from '../logout/Logout';
// import { useDispatch } from 'react-redux';
// import { useState } from 'react';

// const Home = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("isLoggedIn"));

//   const dispatch = useDispatch();
//   console.log("isloged es", isLoggedIn  )
//   const handleLogoutClick =() => {
//     // handleLogout();
//     // sessionStorage.setItem("isLoggedIn", false);
//     sessionStorage.setItem("isLoggedIn", false);

//     dispatch({ type: 'SET_LOGGED_IN_STATUS', payload: { isLoggedIn: false } });
//     console.log("logout")
//     setIsLoggedIn(false);

//   };

//   return (
//     <div className="portada">
//          <header>
//          <nav>
//            <ul>
//              <h1>GOEN</h1>
//              <li><Link to="/estacion">Estacion</Link></li>
//              {isLoggedIn && isLoggedIn !== "false" ? (

//                 <li><button onClick={handleLogoutClick}>Logout</button></li>
//             ) : (
//                 <li><Link to="/login"><button>Login</button></Link></li>
//             )}
//             <li><Link to="/register"><button>Register</button></Link></li>
            
//             {isLoggedIn && isLoggedIn !== "false" ? (
//                 <p>Bienvenido, Usuario</p>
//             ) : (
//                 <p>Inicia sesión para ver contenido personalizado</p>
//             )}


//           </ul>
//         </nav>
//         </header>
//         <div className="descripcion">
//              <p>¡Únete a nuestra comunidad para cargar tu patinete!</p>
//             <button>Únete</button>
//         </div>
//         <br/><br/><br/><br/><br/><br/><br/><br/><br/>
//         <div className='contenido'><p>Bienvenido a nuestra página web de carga de patinetes eléctricos,
//            donde hacemos que la carga de tus patinetes sea más fácil y conveniente que nunca. Nos 
//            enorgullece ofrecer un servicio de carga de alta calidad que está diseñado para ahorrar tiempo 
//            y energía a nuestros usuarios.
//            <br/><br/>
//           En nuestra página web, puedes cargar tu patinete eléctrico en cualquier momento y en cualquier lugar.
//           Nuestro servicio de carga está diseñado para ser flexible y adaptarse a tu horario y necesidades, 
//           lo que significa que puedes cargar tu patinete mientras estás en el trabajo, en casa, o en cualquier otro lugar.
//           <br/><br/>
//           Además de la carga, nuestra página web también proporciona información sobre el estado de carga de tu 
//           patinete y su ubicación. Esto te permitirá saber cuándo tu patinete estará listo para su uso y dónde 
//           se encuentra en todo momento.
//           <br/><br/>
//           Nos aseguramos de que nuestro servicio de carga sea seguro y confiable. Trabajamos con proveedores 
//           de carga de patinetes de confianza que utilizan tecnología de carga de alta calidad para garantizar
//           que tu patinete esté completamente cargado y listo para su uso.
//           <br/><br/>  
//           En resumen, nuestra página web de carga de patinetes eléctricos es la solución perfecta para 
//           simplificar el proceso de carga de tus patinetes. No importa si eres un usuario ocasional o un
//           usuario frecuente de patinetes eléctricos, estamos aquí para hacer que la carga de tus patinetes
//           sea más fácil y conveniente que nunca. ¡Prueba nuestro servicio hoy mismo y experimenta la comodidad
//           de tener tu patinete siempre listo para rodar!</p>
//           </div>
//           <div className='pie'><h4>Daniel Marquez Alonso</h4></div>


//   </div>);
 
// };

// export default Home;
