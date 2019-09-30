import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import to from 'await-to-js';
import Layout from '../../hoc/Layout';
import CreateHospitalForm from '../../components/forms/CreateHospitalForm';

import { HOSPITAL_MUTATION } from '../../graphql/Mutation';
import { HOSPITAL_QUERY } from "../../graphql/Query";

function CreateHospital() {
  const [hospital, setHospital] = useState({
    name: '',
    error: false,
    msg: ''
  });

  const [addHospital] = useMutation(HOSPITAL_MUTATION);
  const { loading, error, data} = useQuery(HOSPITAL_QUERY);

  const variables = {
    hospital: {name: hospital.name}
  }


  const createHospital = async e => {
    e.preventDefault();
    console.log("on submit");
    const [error, ] = await to(addHospital({ variables }));

    if (error) return setHospital({
      ...hospital, error: true,
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
        error={hospital.error}
        errorMsg={hospital.msg}
      />

      <div className="hospitals-wrapper">
        <div className="pixel-loader"></div>
      </div>
    </Layout>
  );
};

export default CreateHospital;
