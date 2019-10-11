import React from 'react';
import logo from '../img/logo.svg';

const AuthWrapper = ({ children, bg }) => (
  <div className="container-fluid page-body-wrapper full-page-wrapper"
    style={{background: 'url(' + bg + ') center center no-repeat'}}
  >
    <div className="content-wrapper d-flex align-items-center auth px-0">
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto">
          <div className="auth-form-light text-left py-5 px-4 px-sm-5">
            <div className="brand-logo">
              <img src={logo} alt=""/>
            </div>

            {children}

          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AuthWrapper;
