import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { getItemFromLocal } from "../utils/localStorage";
import { isAuthPage } from '../utils/authpage';

const Navbar = ({ location }) => {
  const user = getItemFromLocal("user");

  return (
    <>
      {isAuthPage(location) ? (
        <nav className="bottom-navbar ">
          <div className="container">
            <ul className="nav page-navigation justify-content-start">
              <li className="nav-item">
                <NavLink
                  to="/dashboard"
                  exact
                  activeClassName="active"
                  className="nav-link d-flex align-items-center"
                >
                  <i className="material-icons menu-icon mr-1">dashboard</i>
                  <span className="menu-title">Dashboard</span>
                </NavLink>
              </li>
              {user && user.role === "admin" ? (
                <>
                <li className="nav-item">
                  <NavLink
                    to="/users"
                    activeClassName="active"
                    className="nav-link d-flex align-items-center"
                  >
                    <i className="material-icons menu-icon mr-1">
                      supervised_user_circle
                    </i>
                    <span className="menu-title">Users</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/hospital"
                    activeClassName="active"
                    className="nav-link d-flex align-items-center"
                  >
                    <i className="material-icons menu-icon mr-1">
                      local_hospital
                    </i>
                    <span className="menu-title">Hospital</span>
                  </NavLink>
                </li>
                </>
              ) : null}

              {user && user.role === 'superadmin' ?
                <li className="nav-item">
                  <NavLink
                    to="/create"
                    activeClassName="active"
                    className="nav-link d-flex align-items-center"
                  >
                    <i className="material-icons menu-icon mr-1">
                      edit
                  </i>
                    <span className="menu-title">Create Hospital</span>
                  </NavLink>
                </li>
                : null}


              <li className="nav-item">
                <NavLink
                  to="/profile"
                  activeClassName="active"
                  className="nav-link d-flex align-items-center"
                >
                  <i className="material-icons menu-icon mr-1">description</i>
                  <span className="menu-title">Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default withRouter(Navbar);
