import React from 'react';
import placeholder from '../../img/image-placeholder.jpg';

const HospitalCard = ({ title, location, img, onClick }) => (
  <div className="card mb-4" onClick={onClick}>
      <div className="avatar" style={{background: `url(${img || placeholder}) center center no-repeat`}}></div>
      <div className="card-body">
        <h4 className="card-name">
          {title}
        </h4>
        <p className="text-muted pb-0">{location}</p>
      </div>
    </div>
);

export default HospitalCard;
