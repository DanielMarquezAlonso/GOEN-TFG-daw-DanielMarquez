import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [patinetes, setPatinetes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [vatios, setVatios] = useState('');

  console.log("esto es el token")
  console.log(sessionStorage.getItem('token'))
  useEffect(() => {
    fetchPatinetes();
  }, []);

  const fetchPatinetes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/patinetes/', {
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

  const createPatinete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/patinetes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          nombre,
          vatios,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setNombre('');
        setVatios('');
        setPatinetes([...patinetes, data]);
        console.log('Patinete creado con éxito');
      } else {
        throw new Error('Error al crear el patinete');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    navigate('/home');
  };

  return (
    <div className="profile">
      <h1>Perfil</h1>
      <p>Nombre de usuario: {sessionStorage.getItem('username')}</p>
      <button onClick={handleLogoutClick}>Cerrar sesión</button>

      <h2>Mis patinetes</h2>
      <ul>
        {patinetes.map((patinete) => (
          <li key={patinete.id}>
            {patinete.nombre} - {patinete.vatios} W
          </li>
        ))}
      </ul>

      <h2>Crear patinete</h2>
      <form onSubmit={createPatinete}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Vatios"
          value={vatios}
          onChange={(e) => setVatios(e.target.value)}
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default Profile;

// const Profile = () => {
//   const [userData, setUserData] = useState(null);
//   const [patinetes, setPatinetes] = useState([]);
//   const [error, setError] = useState(null);
//   const isLoggedIn = sessionStorage.getItem('isLoggedIn');

//   useEffect(() => {
//     retrieveUserData();
//     retrievePatinetes();
//   }, []);

//   const retrieveUserData = () => {
//     const username = sessionStorage.getItem('username');
//     axios
//       .get(`http://127.0.0.1:8000/profile/`)
//       .then(response => {
//         const user = response.data.find(user => user.username === username);
//         setUserData(user);
//       })
//       .catch(error => {
//         setError(error.message);
//       });
//   };

//   const retrievePatinetes = () => {
//     axios
//       .get(`http://127.0.0.1:8000/patinetes/`)
//       .then(response => {
//         const userPatinetes = response.data.filter(patinete => patinete.propietario === userData.id);
//         setPatinetes(userPatinetes);
//       })
//       .catch(error => {
//         setError(error.message);
//       });
//   };

//   const handleCreatePatinete = () => {
//     const patineteData = {
//       vatios: 100, // Proporciona los datos necesarios para crear el patinete
//     };

//     axios
//       .post(`http://127.0.0.1:8000/patinetes/`, patineteData)
//       .then(response => {
//         retrievePatinetes();
//       })
//       .catch(error => {
//         setError(error.message);
//       });
//   };

//   if (!isLoggedIn || userData === null) {
//     return (
//       <div>Loading...</div>
//     );
//   }

//   return (
//     <div>
//       <h1>Profile</h1>
//       <p>Username: {userData.username}</p>
//       <p>Email: {userData.email}</p>
//       <p>Phone: {userData.telefono}</p>
//       <p>DNI: {userData.dni}</p>

//       <h2>Patinetes</h2>
//       <ul>
//         {patinetes.map(patinete => (
//           <li key={patinete.identificador}>
//             {patinete.identificador} - Vatios: {patinete.vatios}
//           </li>
//         ))}
//       </ul>

//       <button onClick={handleCreatePatinete}>Create Patinete</button>
//     </div>
//   );
// };

// export default Profile;



// primera version solo mostrar perfil
// const Profile = () => {
//   const [data, setData] = useState(null);
//   const [usuario, setUsuario] = useState(null);
//   const [error, setError] = useState(null);
//   const [disponible, setDisponible] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));

//   const location = useLocation();

//   useEffect(() => {
//     retrieveContent();
//   }, []);


//   const retrieveContent = () => {
//     let username = sessionStorage.getItem('username')
//     console.log(username)
//     axios
//       .get(`http://127.0.0.1:8000/profile/`)
//       .then(response => {
//         for (let i = 0; i < response.data.length; i++) {
//             console.log("esto es el for")
//             console.log()
//             if(response.data[i].username === username ){
//                 console.log("entra en el user")
//                 console.log(response.data[i])
//                 // this.setState({data: response.data[i]})
//                 setData(response.data[i]);
//                 console.log("esto es data")

//                 console.log(data)

//             }
            
//         }
//         // setData(response.data);
//         console.log(response.data);
//       })
//       .catch(error => {
//         setError(error.message);
//       });
//   };

//   const handleLogoutClick = () => {
//     sessionStorage.setItem('isLoggedIn', false);
//     console.log('logout');
//     setIsLoggedIn({ isLoggedIn: false });

//   };
//   console.log("esto es data")

//   console.log(data)
//   if (data === null) {
//     return (
//       <div className='portada'>
//         <header>
//           <nav>
//             <ul>
//               <h1>GOEN</h1>
//               <li>
//                 <Link to='/home'>Home</Link>
//               </li>
//               <li>
//                 <Link to='/estacion'>Estaciones</Link>
//               </li>
             
//               <li>
//                 <button onClick={handleLogoutClick}>Logout</button>
//               </li>
//             </ul>
//           </nav>
//         </header>
//         <div>Loading</div>
//       </div>
//     );
//   }


//   return (
//     <>
//       {sessionStorage.getItem('isLoggedIn') && sessionStorage.getItem('isLoggedIn') !== 'false' ? (
//         <div className='portada'>
//           <header>
//             <nav>
//               <ul>
//                 <h1>GOEN</h1>
//                 <li>
//                   <Link to='/home'>Home</Link>
//                 </li>
//                 <li>
//                 <Link to='/estacion'>Estaciones</Link>
//               </li>
//                 <li>
//                   <button onClick={handleLogoutClick}>Logout</button>
//                 </li>
//               </ul>
//             </nav>
//           </header>
//           <h1>Perfil</h1>
//           <p>{data.username}</p> 
//           <p>{data.telefono}</p> 
//           <p>{data.email}</p> 

//           <p>{data.dni}</p> 

//         </div>
//       ) : (
//         <Navigate to='/home' replace />
//       )}
//     </>
//   );
// };

// export default Profile;

