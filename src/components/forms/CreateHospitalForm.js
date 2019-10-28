import React from 'react';
import Button from '../ui/Button';
import Input from './Input';
import Error from '../ui/Error';

const CreateHospitalForm = props => (
  <form action="" onSubmit={props.onHospitalSubmit}>
    <div className="row align-items-end">
      <div className="col-md-8">
        <Input
          name="name"
          bm={false}
          value={props.hospitalValue}
          onChange={props.onChange}
          placeholder="Hospital Name"
          className="form-control white"
        />
      </div>
      <div className="col-md-4">
        <Button type="submit" text="Add Hospital" btnSize="lg" />
      </div>

      <div className="col-md-12 mt-2">
        <Error err={props.error} msg={props.errorMsg} />
      </div>
    </div>
  </form>
);

export default CreateHospitalForm;
