import React from 'react';
import Modal from '../modal/Modal';
import Input from './Input';

const UpdateHospital = (props) => {
  return (
    <Modal show={props.show} onClose={props.onClose} title="Update Hospital">
      <form action="" onSubmit={props.onSubmit}>
        <Input
          name="name"
          type="text"
          bm={true}
          value={props.hospital.name}
          onChange={props.onChange}
          className="form-control"
          placeholder="Hospital name"
        />

        <Input
          name="location"
          type="text"
          bm={true}
          value={props.hospital.location || ""}
          onChange={props.onChange}
          className="form-control"
          placeholder="Location"
        />
      </form>
    </Modal>
  );
}

export default UpdateHospital;
