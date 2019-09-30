import React from 'react';

const Button = ({ text, block }) => {
  const commonClasses =
    "btn btn-primary btn-lg font-weight-medium auth-form-btn";

  const btnClass = block ? `btn-block ${commonClasses}` : commonClasses;

  return <button className={btnClass}>{text}</button>;
};


export default Button;
