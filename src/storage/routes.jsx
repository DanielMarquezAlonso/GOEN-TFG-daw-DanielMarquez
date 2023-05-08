import React, { Suspense, lazy } from 'react';
import { Router, Route, Routes,  Navigate, BrowserRouter  } from 'react-router-dom';
import Home from '../views/home/Home';
import Error from '../views/error/Error';
import Estacion from '../views/estacion/Estacion';
// import LazyLoading from '../views/lazy-loading';
// import Error from '../views/error';
// import NotFound from '../views/not-found';
// import appHistory from './app-history';

// function handleLazyError(Import) {
//   return new Promise((resolve, reject) => {
//     Import()
//       .then(resolve)
//       .catch((error) => {
//         resolve(import('../views/error'));
//       });
//   });
// }

// const Home = lazy(() => handleLazyError(() => import('../views/home')));

const Navigator = () => (
  <BrowserRouter>
    {/* <Suspense fallback={<LazyLoading />}> */}
      <Routes>
        <Route path="/" element={<Navigate replace to={'/home'} />} /> 

        <Route path="/home" element={<Home/>} />
        <Route path="/estacion" element={<Estacion/>} />

        {/* Error Routing */}
        {/* <Route path="/error" element={Error} /> */}
        {/* Not Found Routing */}
        <Route path="*" element={<Error/>} />
      </Routes>
    {/* </Suspense> */}
  </BrowserRouter>
);

export { Navigator as default };
