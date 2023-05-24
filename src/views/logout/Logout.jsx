// export const handleLogout = () => {
//     sessionStorage.setItem("isLoggedIn", false);
//     console.log("se ejecuta logout");
//   };    

import { clearLoggedInStatus } from '../../storage/sessionStorage';

export const handleLogout = () => {
  // Realiza las acciones necesarias para el cierre de sesión
  // Por ejemplo, limpiar el estado, realizar una solicitud al servidor, etc.

  // Limpia el estado de inicio de sesión en sessionStorage
  clearLoggedInStatus();

  // Otras acciones de cierre de sesión, como redireccionamiento, reinicio del estado, etc.
};