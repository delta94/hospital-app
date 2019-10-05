import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/react-hooks';
import to from 'await-to-js';
import Layout from '../../hoc/Layout';
import CreateHospitalForm from '../../components/forms/CreateHospitalForm';
import Loader from '../../components/ui/Loader';
import HospitalCard from '../../components/hospital/HospitalCard';
import Permission from '../Permission';

import { HOSPITAL_MUTATION } from '../../graphql/Mutation';
import { UPLOAD_FILE } from "../../graphql/Mutation";
import { HOSPITAL_QUERY } from "../../graphql/Query";

function CreateHospital({ history }) {
  const [hospital, setHospital] = useState({
    name: '',
    error: false,
    msg: ''
  });

  const [addHospital] = useMutation(HOSPITAL_MUTATION, {
    refetchQueries: [{ query: HOSPITAL_QUERY }]
  });

  const [singleUpload] = useMutation(UPLOAD_FILE);
  const { loading, error,  data} = useQuery(HOSPITAL_QUERY);

  const variables = {
    hospital: {name: hospital.name}
  }


  const createHospital = async e => {
    e.preventDefault();
    const [error, ] = await to(addHospital({ variables }));

    if (error) return setHospital({
      ...hospital, error: true,
      msg: error.graphQLErrors[0].message
    });

    setHospital({ name: '', error: false, msg: '' });
  };

  const onClickHospital = (id) => history.push(`/hospital/${id}`);

  const onChangeFile = async (e) => {
    const [file] = e.target.files;
    await to(singleUpload({ variables: { file } }));
  }

  if (error) return <Permission />;

  return (
    <Layout loading={loading}>
      <h2 className="pb-3">Hospitals</h2>
      <CreateHospitalForm
        hospitalValue={hospital.name}
        onChange={e => setHospital({ name: e.target.value })}
        onHospitalSubmit={createHospital}
        error={hospital.error}
        errorMsg={hospital.msg}
        onChangeFile={onChangeFile}
      />

      <div className="hospitals-wrapper row pt-8">
        {loading ? (
          <Loader />
        ) : (
          data.hospitals.map((hospital, i) => (
            <div className="col-md-4 pb-4" key={i}>
              <HospitalCard
                title={hospital.name}
                location={hospital.location}
                onClick={() => onClickHospital(hospital.id)}
              />
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default CreateHospital;
