import React from "react";

const Input = props => (
  <div className={props.bm ? "form-group" : "form-group   mb-0"}>
    {props.label && <label htmlFor={props.name}>{props.label}</label>}
    <input
      value={props.value || ''}
      type={props.type || 'text'}
      onChange={props.onChange}
      name={props.name}
      className={props.className}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
  </div>
);

export default Input;
