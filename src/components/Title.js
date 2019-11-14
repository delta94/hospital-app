import React from "react";

const Title = ({ text, sub }) => (
  <div className="title-content text-center pb-5">
    <h1 className="pb-1 text-capitalize">{text}</h1>
    <h5 className="text-muted">{sub}</h5>
  </div>
);

export default Title;
