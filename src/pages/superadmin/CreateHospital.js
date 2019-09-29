import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import to from 'await-to-js';
import Layout from '../../hoc/Layout';
import CreateHospitalForm from '../../components/forms/CreateHospitalForm';

import { HOSPITAL_MUTATION } from '../../graphql/Mutation';

function CreateHospital() {
  const [hospital, setHospital] = useState({
    name: '',
    err: false,
    msg: ''
  });

  const variables = {
    hospital: {name: hospital.name}
  }

  const [addHospital] = useMutation(HOSPITAL_MUTATION);


  const createHospital = async e => {
    e.preventDefault();
    console.log("on submit");
    const [error, response] = await to(addHospital({ variables }));

    if (error) return setHospital({
      ...hospital, err: true,
      msg: error.graphQLErrors[0].message
    });

    setHospital({ name: '', error: false, msg: '' });
  };
  return (
    <Layout>
      <h2 className="pb-3">Hospitals</h2>
      <CreateHospitalForm
        hospitalValue={hospital.name}
        onChange={e => setHospital({ name: e.target.value })}
        onHospitalSubmit={createHospital}
      />
    </Layout>
  );
};

export default CreateHospital;
