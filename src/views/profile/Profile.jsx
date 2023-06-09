import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [data, setData] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [disponible, setDisponible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    retrieveContent();
  }, []);


  const retrieveContent = () => {
    let  username = sessionStorage.getItem('username')
    console.log(username)
    axios
      .get(`http://127.0.0.1:8000/profile/`)
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
            console.log("esto es el for")
            console.log()
            if(response.data[i].username === username ){
                console.log("entra en el user")
                console.log(response.data[i])
                // this.setState({data: response.data[i]})
                setData(response.data[i]);
                console.log("esto es data")

                console.log(data)

            }
            
        }
        // setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleLogoutClick = () => {
    sessionStorage.setItem('isLoggedIn', false);
    console.log('logout');
    // Rest of your logout logic
  };
  console.log("esto es data")

  console.log(data)
  if (data === null) {
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
      {sessionStorage.getItem('isLoggedIn') && sessionStorage.getItem('isLoggedIn') !== 'false' ? (
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
          <h1>Perfil</h1>
          <p>{data.username}</p> 
          <p>{data.dni}</p> 

        </div>
      ) : (
        <Navigate to='/home' replace />
      )}
    </>
  );
};

export default Profile;

