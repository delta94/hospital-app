import React from "react";

const HospitalUserTable = ({ users }) => {
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
                  className={
                    user && !user.pending
                      ? "material-icons text-success"
                      : "material-icons text-muted"
                  }
                >
                  verified_user
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
