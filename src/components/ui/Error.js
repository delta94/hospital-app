import React from 'react'

const Error = ({ err, msg }) => {
  if (err) {
    return (<div className="alert alert-danger" role="alert">
      {msg}
    </div>);
  }

  return null;
}

export default Error;
