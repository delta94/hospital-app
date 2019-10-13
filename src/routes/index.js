import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import Layout from '../hoc/Layout';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateHospital from '../pages/superadmin/CreateHospital';
import HospitalEdit from '../pages/superadmin/HospitalAdmin';
import Hospital from '../pages/HospitalProfile';
import Pending from '../pages/AuthPending';
import HospitalUsers from '../pages/admin/HospitalUsers';
import Dashboard from '../pages/Dashboard';
import UserProfile from '../pages/UserProfile';

import { getItemFromLocal } from '../utils/localStorage';

function RouterComponent() {
  const user = getItemFromLocal('user');
  return (
    <Router>
      <Header user={user} />
      <Navbar />
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/pending" component={Pending} />
          <PrivateRoute
            path="/hospital/create"
            routeComponet={CreateHospital}
          />
          <PrivateRoute path="/hospital/:id" routeComponet={HospitalEdit} />
          <AdminRoute path="/hospital/" routeComponent={Hospital} />
          <AdminRoute path="/users" exact routeComponent={HospitalUsers} />
          <AdminRoute path="/profile" exact routeComponent={UserProfile} />
          <AdminRoute path="/" exact routeComponent={Dashboard} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default RouterComponent;
