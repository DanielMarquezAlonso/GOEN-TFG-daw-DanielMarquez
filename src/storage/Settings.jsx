import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const handleLazyError = (Import) =>
  new Promise((resolve) => {
    Import()
      .then(resolve)
      .catch((error) => {
        console.error('Error when importing a view:', error);
        resolve(import('../views/error/Error'));
      });
  });

export const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
      const location = useLocation();
      const navigate = useNavigate();
      const params = useParams();
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props} router={{ location, navigate, params }} />;
    }
    return ComponentWithRouterProp;
  };