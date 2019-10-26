import React from "react";

const Textarea = props => (
  <div className={props.bm ? "form-group" : "form-group   mb-0"}>
    {props.label && <label htmlFor={props.name}>{props.label}</label>}
    <textarea
      value={props.value || ''}
      onChange={props.onChange}
      name={props.name}
      className={props.className}
      placeholder={props.placeholder}
      rows="5"
    />
  </div>
);

export default Textarea;
