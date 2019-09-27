import React from 'react';
import { Route } from "react-router-dom";
import Permission from '../pages/Permission';

import { getItemFromLocal } from '../utils/localStorage';

const PrivateRoute = ({routeComponet: Component, ...rest}) => {
  const user = getItemFromLocal('user');

  return (
    <Route
      {...rest}
      render={props =>
        user && user.role === "superadmin" ? (
          <Component {...props} />
        ) : (
          <Permission />
        )
      }
    ></Route>
  );
}

export default PrivateRoute;
