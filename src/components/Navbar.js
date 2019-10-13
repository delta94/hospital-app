import React from "react";
import { Link } from "react-router-dom";
import { getItemFromLocal } from "../utils/localStorage";

const Navbar = () => {
  const user = getItemFromLocal("user");
  return (
    <nav className="bottom-navbar ">
      <div className="container">
        <ul className="nav page-navigation justify-content-start">
          <li className="nav-item">
            <Link to="/" className="nav-link d-flex align-items-center">
              <i className="material-icons menu-icon mr-1">dashboard</i>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/hospital" className="nav-link d-flex align-items-center">
              <i className="material-icons menu-icon mr-1">local_hospital</i>
              <span className="menu-title">Hospital</span>
            </Link>
          </li>
          {user && user.role === "admin" ? (
            <li className="nav-item">
              <Link to="/users" className="nav-link d-flex align-items-center">
                <i className="material-icons menu-icon mr-1">
                  supervised_user_circle
                </i>
                <span className="menu-title">Users</span>
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
