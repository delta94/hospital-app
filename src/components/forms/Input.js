import React from "react";

const Input = props => (
  <div className={props.bm ? "form-group" : "form-group   mb-0"}>
    {props.label && <label htmlFor={props.name}>{props.label}</label>}
    <input
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      name={props.name}
      className={props.className}
      placeholder={props.placeholder}
    />
    {props.info !== '' ? <p className="info text-warning">{props.info}</p> : null}
  </div>
);

export default Input;
