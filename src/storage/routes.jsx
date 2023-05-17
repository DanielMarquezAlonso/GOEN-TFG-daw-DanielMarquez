import React, { Suspense, lazy } from 'react';
import { Router, Route, Routes,  Navigate, BrowserRouter  } from 'react-router-dom';
import Home from '../views/home/Home';
import Error from '../views/error/Error';
import Estacion from '../views/estacion/Estacion';
import LoginForm from '../views/login/Login';
import RegisterForm from '../views/register/Register';

const isLoggedIn= sessionStorage.getItem("isLoggedIn");


const Navigator = () => (
  <BrowserRouter>
    {/* <Suspense fallback={<LazyLoading />}> */}
      <Routes>
        <Route path="/" element={<Navigate replace to={'/home'} />} /> 

        <Route path="/home" element={<Home/>} />
        <Route path="/estacion" element={isLoggedIn ? <Estacion/> : <Error/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>} />


        {/* Error Routing */}
        {/* <Route path="/error" element={Error} /> */}
        {/* Not Found Routing */}
        <Route path="*" element={<Error/>} />
      </Routes>
    {/* </Suspense> */}
  </BrowserRouter>
);

export { Navigator as default };
