import React, { useState } from 'react';
import Layout from '../../hoc/Layout';
import Input from '../../components/forms/Input';
import Button from '../../components/ui/Button';

function CreateHospital() {
  const [hospital, setHospital] = useState({
    name: '',
  });
  return (
    <Layout>
      <h2 className="pb-3">Hospitals</h2>

      <form action="">
        <div className="row align-items-end">
          <div className="col-md-8">
            <Input
              label="Create Hospital"
              name="name"
              bm={false}
              value={hospital.name}
              onChange={e => setHospital({ name: e.target.value })}
              placeholder="Hospital Name"
              className="form-control mb-0"
            />
          </div>
          <div className="col-md-4">
            <Button type="submit" text="Add Hospital" />
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default CreateHospital;
