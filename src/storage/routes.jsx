import React, { Suspense, lazy } from 'react';
import { Route, Routes,  Navigate, BrowserRouter  } from 'react-router-dom';
import Home from '../views/home/Home';
import Error from '../views/error/Error';
import Estacion from '../views/estacion/Estacion';
import LoginForm from '../views/login/Login';
import RegisterForm from '../views/register/Register';
import PuestoCarga from '../views/puestoCarga/PuestoCarga';
import { handleLazyError, withRouter } from '../storage/Settings';

const Settings = lazy(() => handleLazyError(() => import('../storage/Settings')));
const SettingsWithRouter = withRouter(Settings)


const Navigator = () => {


return (
  <BrowserRouter>
      <Routes>
        <Route path="settings" element={<SettingsWithRouter />} />

        <Route path="/" element={<Navigate replace to={'/home'} />} /> 

        <Route path="/home" element={<Home/>} />
        {/* <Route path="/estacion" element={isLoggedIn ? <Estacion/> : <Error/>} /> */}
        <Route path="/estacion" element={<Estacion/>} />
        {/* <Route path="/estacion/:nombreEstacion/puestoCarga" element={PuestoCarga} /> */}

      <Route path="/puestoCarga/:nombreEstacion" element={<PuestoCarga/>} />

        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>} />


        {/* Error Routing */}
        {/* Not Found Routing */}
        <Route path="*" element={<Error/>} />
      </Routes>
  </BrowserRouter>
);
};
export { Navigator as default };
