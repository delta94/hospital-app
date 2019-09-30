import React from 'react';

const Button = ({ text, block, onClick }) => {
  const commonClasses =
    "btn btn-primary btn-lg font-weight-medium auth-form-btn";

  const btnClass = block ? `btn-block ${commonClasses}` : commonClasses;

  return <button onClick={onClick} className={btnClass}>{text}</button>;
};


export default Button;
