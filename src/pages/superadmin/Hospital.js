import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Layout from "../../hoc/Layout";

import { SINGLE_HOSPITAL } from '../../graphql/Query';

function HospitalEdit({match}) {
  const { id } = match.params;

  const { data } = useQuery(SINGLE_HOSPITAL, {
    variables: { id }
  });

  console.log(data);

  return (
    <Layout>
      <h3>Hospital edit</h3>
    </Layout>
  )
}

export default HospitalEdit;
