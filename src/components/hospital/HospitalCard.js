import React from 'react';

const HospitalCard = ({ title, location, img, onClick }) => (
  <div className="card" onClick={onClick}>
    <img
      className="card-img-top"
      src={img || 'https://via.placeholder.com/363x200'}
      alt=""
    />
    <div className="card-body">
      <h4 className="card-title mt-3">{title}</h4>
      <p className="card-text">{location}</p>
    </div>
  </div>
);

export default HospitalCard;
