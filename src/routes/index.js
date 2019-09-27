import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Login from '../pages/Login';
import Register from '../pages/Register';

import { getItemFromLocal } from '../utils/localStorage';


function RouterComponent() {
  const user = getItemFromLocal('user');
  return (
    <Router>
      <Header user={user} />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default RouterComponent;
