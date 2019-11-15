import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import logo from "../img/logo-white.svg";

import { getItemFromLocal, clearStorage } from "../utils/localStorage";
import { isAuthPage } from "../utils/authpage";

function Header({ location }) {
  const user = getItemFromLocal("user");
  const avatar = user !== null ? user.avatar : "";

  const handleLogOut = () => clearStorage(["user", "token"]);

  return (
    <>
      {isAuthPage(location) ? (
        <nav className="navbar top-navbar bg-primary">
          <div className="text-left navbar-brand-wrapper d-flex align-items-center justify-content-between">
            <Link className="navbar-brand brand-logo" to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item nav-user-icon">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item nav-user-icon">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              {user !== null ? (
                <li className="nav-item" onClick={handleLogOut}>
                  <Link className="nav-link" to="/login">
                    Log Out
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    LogIn
                  </Link>
                </li>
              )}
              <li className="nav-item nav-user-icon">
                <Link className="nav-link" to="/profile">
                  <div
                    className="avatar"
                    style={{
                      background: "url(" + avatar + ") center center no-repeat"
                    }}
                  ></div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      ) : null}
    </>
  );
}

export default withRouter(Header);
