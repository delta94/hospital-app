import React from 'react';
import Button from '../ui/Button';
import Input from './Input';

const CreateHospitalForm = props => (
  <form action="" onSubmit={props.onHospitalSubmit}>
    <div className="row align-items-end">
      <div className="col-md-8">
        <Input
          label="Create Hospital"
          name="name"
          bm={false}
          value={props.hospitalValue}
          onChange={props.onChange}
          placeholder="Hospital Name"
          className="form-control white"
        />
      </div>
      <div className="col-md-4">
        <Button type="submit" text="Add Hospital" />
      </div>
    </div>
  </form>
);

export default CreateHospitalForm;
