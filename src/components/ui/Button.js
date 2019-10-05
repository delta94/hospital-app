import React from 'react';

const Button = ({ text, block, onClick, btnSize }) => {
  const commonClasses =
    "btn btn-primary font-weight-medium auth-form-btn";

  const btnClass = block ? `btn-block ${commonClasses}` : commonClasses;

  return <button onClick={onClick} className={btnClass + ' btn-'+btnSize}>{text}</button>;
};


export default Button;
