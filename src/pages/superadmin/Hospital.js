import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Layout from "../../hoc/Layout";
import Loading from '../../components/ui/Loader';
import Button from '../../components/ui/Button';

import { SINGLE_HOSPITAL } from '../../graphql/Query';

function HospitalEdit({match}) {
  const { id } = match.params;

  const { loading, error, data } = useQuery(SINGLE_HOSPITAL, {
    variables: { id }
  });

  const HospitalDetails = () =>
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3>{data.hospital.name}</h3>
        <Button text="Add Admin"  />

      </div>
      <p>{data.hospital.location}</p>
    </div>


  return <Layout>
    {
      loading
      ? <Loading />
        : <HospitalDetails />
    }
  </Layout>;
}

export default HospitalEdit;
