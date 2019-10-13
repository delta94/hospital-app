import React from 'react'
import { Route } from 'react-router-dom';
import { getItemFromLocal } from '../utils/localStorage';

import Permission from '../pages/Permission';

const AdminRoute = ({ routeComponent: Component, ...rest }) => {
  const user = getItemFromLocal('user');

  return (
    <Route
    {...rest}
      render={props =>
        (user && user.role === 'admin') || (user && user.role === 'manager')
          ? <Component {...props}/>
          : <Permission />
    }
    >

    </Route>
  )
}

export default AdminRoute;
