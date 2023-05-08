import './home.scss';


export const  Home = ()=>{
    return(
    <div className="portada">
        <header>
        <nav>
          <ul>
            <h1>GOEN</h1>
            <li><a href="/estacion">Inicio</a></li>
            <li><button>Login</button></li>

          </ul>
        </nav>
        </header>
        <div className="descripcion">
             <p>¡Únete a nuestra comunidad para cargar tu patinete!</p>
            <button>Únete</button>
        </div>
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
          <div className='pie'><h1>pie de pagina</h1></div>


  </div>);
}

export default Home;