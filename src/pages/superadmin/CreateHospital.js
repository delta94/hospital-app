import React, { useState } from 'react';
import Layout from '../../hoc/Layout';
import Input from '../../components/forms/Input';

function CreateHospital() {
  const [hospital, setHospital] = useState({
    name: '',
  });
  return (
    <Layout>
      <h2 className="pb-3">Hospitals</h2>

      <form action="">
        <Input
          label="Create Hospital"
          name="name"
          value={hospital.name}
          onChange={(e) => setHospital({name: e.target.value})}
          placeholder="Hospital Name"
          className="form-control"
        />

      </form>
    </Layout>
  )

}

export default CreateHospital;
