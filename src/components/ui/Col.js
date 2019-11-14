import React from "react";

const Col = ({ take, children }) => {
  const className = `col-${take}`;

  return <div className={className}>{children}</div>;
};

export default Col;
