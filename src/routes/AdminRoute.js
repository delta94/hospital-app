import React from 'react'
import { Route, withRouter } from 'react-router-dom';
import { getItemFromLocal } from '../utils/localStorage';

import Permission from '../pages/Permission';

const AdminRoute = ({ routeComponent: Component, history, ...rest }) => {
  const user = getItemFromLocal('user');
  if (user === null) history.push('/login');

  return (
    <Route
    {...rest}
      render={props =>
        (user.role === 'admin') || (user.role === 'manager') || (user.role === 'doctor')
          ? <Component {...props}/>
          : <Permission />
    }
    >

    </Route>
  )
}

export default withRouter(AdminRoute);
