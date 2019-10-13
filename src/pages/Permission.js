import React from "react";
import { Link } from "react-router-dom";

function Permission() {
  return (
    <>
      <h2>You do not have permission to access this page</h2>
      <Link to="/">Return to home</Link>
    </>
  );
}

export default Permission;
