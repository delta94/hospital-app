import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import logo from '../img/logo.svg';

function Header({ user, location }) {
  const isAuthPage = () => {
    if (location.pathname === "/register" || location.pathname === "/login") {
      return false;
    }

    return true;
  };

  return (
    <>
    {isAuthPage() ? (
      <nav className="navbar top-navbar ">
        <div className="text-left navbar-brand-wrapper d-flex align-items-center justify-content-between">
          <Link className="navbar-brand brand-logo" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-user-icon">
              <Link className="nav-link" to="/profile">
                <img src="https://via.placeholder.com/37x37" alt="" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    ) : null }
    </>
  )
}

export default withRouter(Header);
