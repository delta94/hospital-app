import React from "react";

const Button = ({ text, block, onClick, btnSize, loading }) => {
  const commonClasses = "btn btn-primary font-weight-medium auth-form-btn";

  const btnClass = block ? `btn-block ${commonClasses}` : commonClasses;

  const style = {
    opacity: loading ? 0 : 1,
  }

  return (
    <button onClick={onClick} className={btnClass + " btn-" + btnSize}>
      {loading ? (
        <div className="dot-opacity-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : null}
      <span style={style}>{text}</span>
    </button>
  );
};

export default Button;
