import React from "react";
import { useMutation } from '@apollo/react-hooks';
import { omit } from 'lodash';
import to from 'await-to-js';
import { UPDATE_USER_MUTATION } from "../../graphql/Mutation";
import { HOSPITAL_USERS } from '../../graphql/Query';

const HospitalUserTable = ({ users }) => {
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);


  const approvedUser = async (user) => {
    user = omit(user, ['__typename']);
    await to(
      updateUser({
        variables: { userInput: { ...user, pending: !user.pending } },
        refetchQueries: [
          { query: HOSPITAL_USERS, variables: { id: user.hospital } }
        ]
      })
    );
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>First name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map(user => (
          <tr key={user.id}>
            <td className="py-1">
              <div
                className="avatar bg-primary"
                style={{
                  background: "url()",
                  width: `${36}px`,
                  height: `${36}px`
                }}
              ></div>
            </td>
            <td>{user.firstName}</td>

            <td>{user.email}</td>
            <td>
              {user && user.pending ? (
                <label className="badge badge-danger">Pending</label>
              ) : (
                <label className="badge badge-success">Appoved</label>
              )}
            </td>
            <td>
              <div className="actions d-flex align-items-center">
                <i
                  onClick={() => approvedUser(user)}
                  className={
                    user && !user.pending
                      ? "material-icons text-success pointer"
                      : "material-icons-outlined text-muted pointer"
                  }
                >
                  verified_user
                </i><i
                  className="material-icons pointer ml-2"
                >
                  delete
                </i>

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HospitalUserTable;
