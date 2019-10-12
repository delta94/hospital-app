import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bottom-navbar ">
      <div className="container">
        <ul className="nav page-navigation">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="material-icons menu-icon">dashboard</i>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
