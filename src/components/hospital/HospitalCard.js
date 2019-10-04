import React from 'react';
import placeholder from '../../img/image-placeholder.jpg';

const HospitalCard = ({ title, location, img, onClick }) => (
  <div className="card" onClick={onClick}>
    <div
      className="card-img-top"
      style={{background: `url(${img || placeholder}) center center no-repeat`}}
    ></div>
    <div className="card-body">
      <h4 className="card-title mt-3">{title}</h4>
      <p className="card-text">{location}</p>
    </div>
  </div>
);

export default HospitalCard;
