import React from 'react';

const Card = ({ firstName, lastName, avatar, bio, specialties, onClick }) => {
  return (
    <div className="card mb-4" onClick={onClick}>
      <div className="card-body">
        <img src={avatar} alt=""/>
        <h4 className="card-name">{firstName} {lastName}</h4>
        <p>{bio}</p>
        <p>{specialties && specialties.map(item => <span>{item}</span>)}</p>
      </div>
    </div>
  );
}

export default Card;
