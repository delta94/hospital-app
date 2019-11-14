import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/react-hooks';
import to from 'await-to-js';
import CreateHospitalForm from '../../components/forms/CreateHospitalForm';
import Loader from '../../components/ui/Loader';
import HospitalCard from '../../components/hospital/HospitalCard';

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
  const { loading,  data} = useQuery(HOSPITAL_QUERY);

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

  const onClickHospital = id => history.push(`/edithospital/${id}`);

  const onChangeFile = async (e) => {
    const [file] = e.target.files;
    await to(singleUpload({ variables: { file } }));
  }


  if (loading) return <Loader />;

  return (
    <>
      <h4 className="pb-3">Create Hospitals</h4>
      <CreateHospitalForm
        hospitalValue={hospital.name}
        onChange={e => setHospital({ name: e.target.value })}
        onHospitalSubmit={createHospital}
        error={hospital.error}
        errorMsg={hospital.msg}
        onChangeFile={onChangeFile}
      />


      <h2 className="pb-3 pt-5">Hospital Lists</h2>
      <div className="hospitals-wrapper row">
        {loading ? (
          <Loader />
        ) : (
          data.hospitals.map((hospital, i) => (
            <div className="col-md-4 pb-2" key={i}>
              <HospitalCard
                title={hospital.name}
                img={hospital.logo}
                location={hospital.location}
                onClick={() => onClickHospital(hospital.id)}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CreateHospital;
