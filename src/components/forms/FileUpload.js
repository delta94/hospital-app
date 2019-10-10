import React from 'react';

const FileUpload = ({onChange, name, user}) => {
  if (user.role !== 'admin') return null;
  return (
    <div className="file-upload">
      <input type="file" onChange={onChange} name={name} />
      <button type="button" className="btn btn-inverse-dark btn-icon">
        <i className="ti-image text-white"></i>
      </button>
    </div>
  );
}

export default FileUpload;
