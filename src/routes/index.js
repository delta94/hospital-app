import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import Layout from "../hoc/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateHospital from "../pages/superadmin/CreateHospital";
import HospitalEdit from "../pages/superadmin/HospitalAdmin";
import Hospital from "../pages/HospitalProfile";
import Pending from "../pages/AuthPending";
import HospitalUsers from "../pages/admin/HospitalUsers";
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/UserProfile";

function RouterComponent() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/pending" component={Pending} />

        <Layout>
          <AdminRoute path="/hospital/" routeComponent={Hospital} />
          <AdminRoute path="/users" exact routeComponent={HospitalUsers} />
          <Route path="/profile" exact component={UserProfile} />
          <PrivateRoute exact path="/edithospital/:id" component={HospitalEdit} />
          <PrivateRoute exact path="/create" component={CreateHospital} />
          <AdminRoute path="/" exact routeComponent={Dashboard} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default RouterComponent;
