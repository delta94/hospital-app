import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { omit } from "lodash";
import to from "await-to-js";

import { HOSPITAL_USERS } from "../../graphql/Query";
import { UPDATE_USER_MUTATION } from "../../graphql/Mutation";

import Loader from "../../components/ui/Loader";
import { AuthContext } from "../../context/authContext";
import HospitalUserTable from "../../components/table/hosiptalUserTable";

const HospitalUsers = () => {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(HOSPITAL_USERS, {
    fetchPolicy: "cache-and-network",
    variables: { id: user.hospital }
  });


  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  const approvedUser = async (user) => {
    user = omit(user, ['__typename']);
    const [err] = await to(
      updateUser({
        variables: { userInput: { ...user, pending: !user.pending } },
        refetchQueries: [
          {
            query: HOSPITAL_USERS,
            variables: { id: user.hospital },
            fetchPolicy: "cache-and-network"
          }
        ]
      })
    );

    console.log(err);
  };


  if (loading) return <Loader />;

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-name">Users Info</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>First name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.getHospitalUsers.map(user => <HospitalUserTable
              key={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              avatar={user.avatar}
              role={user.role}
              onApprovedUser={() => approvedUser(user)}
             />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalUsers;
