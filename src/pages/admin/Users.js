import React, {useContext} from "react";
import { useQuery } from '@apollo/react-hooks';

import Layout from "../../hoc/Layout";
import Loader from '../../components/ui/Loader';
import { HOSPITAL_USERS } from "../../graphql/Query";
import { AuthContext } from "../../context/authContext";
import HospitalUserTable from "../../components/table/hosiptalUserTable";


const HospitalUsers = () => {
  const {user} = useContext(AuthContext);

  const { loading, data } = useQuery(HOSPITAL_USERS, {
    variables: {id: user.hospital}
  });

  if (loading)
    return <Layout><Loader /></Layout>

  console.log(data);

  return (
    <Layout>
      <div className="card">
        <div className="card-body">
          <h4 className="card-name">Users Info</h4>
          <HospitalUserTable users={data.getHospitalUsers}/>

        </div>
      </div>
    </Layout>
  );
};

export default HospitalUsers;
