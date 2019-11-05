import React from 'react';

const Card = ({ firstName, lastName, avatar, bio, specialties, onClick }) => {
  return (
    <div className="card mb-4" onClick={onClick}>
      <div className="avatar" style={{background: 'url(' + avatar + ') center center no-repeat'}}></div>
      <div className="card-body">
        <h4 className="card-name">
          {firstName} {lastName}
        </h4>
        <p className="text-muted">{bio}</p>
        <p className="text-muted">{specialties && specialties.map(item => <span key={item}>{item}, </span>)}</p>
      </div>
    </div>
  );
}

export default Card;
