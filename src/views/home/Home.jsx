import './home.scss';


export const  Home = ()=>{
    return(
    <div className="portada">
        <header>
            <h1>GOEN</h1>
        </header>
        <div className="descripcion">
             <p>¡Únete a nuestra comunidad para cargar tu patinete!</p>
        <button>Únete</button>
        </div>
  </div>);
}

export default Home;