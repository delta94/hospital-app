import React from 'react';
import { Route } from "react-router-dom";
import Permission from '../pages/Permission';

import { getItemFromLocal } from '../utils/localStorage';

const PrivateRoute = ({component: Component, history, ...rest}) => {
  const user = getItemFromLocal('user');
  if (user === null) history.push("/login");

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
