import React from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
