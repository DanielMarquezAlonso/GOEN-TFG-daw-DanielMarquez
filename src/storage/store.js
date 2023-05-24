import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './reducers';
import { setLoggedInStatus } from './sessionStorage';

// Middleware para acceder a sessionStorage
const sessionStorageMiddleware = store => next => action => {
  if (action.type === 'SET_LOGGED_IN_STATUS') {
    const { isLoggedIn } = action.payload;
    setLoggedInStatus(isLoggedIn);
  }
  return next(action);
};

// Crear el store de Redux
const store = createStore(
//   rootReducer,
  applyMiddleware(sessionStorageMiddleware)
);

export default store;

