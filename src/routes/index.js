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
import Home from "../pages/Home";
import Doctors from "../pages/Doctors";
import Hospitals from "../pages/Hospitals";


function RouterComponent() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/pending" component={Pending} />
        <Route exact path="/" component={Home} />
        <Route exact path="/hospitals" component={Hospitals} />
        <Route exact path="/doctors" component={Doctors} />

        <Layout>
          <AdminRoute path="/hospital/" routeComponent={Hospital} />
          <AdminRoute path="/users" exact routeComponent={HospitalUsers} />
          <Route path="/profile" exact component={UserProfile} />
          <PrivateRoute
            exact
            path="/edithospital/:id"
            component={HospitalEdit}
          />
          <PrivateRoute exact path="/create" component={CreateHospital} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default RouterComponent;
