import React from 'react';
import Loader from '../components/ui/Loader';

const Layout = ({children, loading}) => {
  return (
    <div className="container-fluid page-body-wrapper">
      <div className="main-panel">
        <div className="content-wrapper">
          {loading ? <Loader /> : children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
