import React from "react";

const HospitalUserTable = (props) => {
  return (
    <tr>
      <td className="py-1">
        <div
          className="avatar bg-primary"
          style={{
            background: 'url(' + props.avatar + ') center center no-repeat',
            width: `${36}px`,
            height: `${36}px`
          }}
        ></div>
      </td>
      <td>{props.firstName} {props.lastName}</td>

      <td>{props.email}</td>
      <td style={{textTransform: 'capitalize'}}>{props.role}</td>
      <td>
        { props.pending ? (
          <label className="badge badge-danger">Pending</label>
        ) : (
          <label className="badge badge-success">Appoved</label>
        )}
      </td>
      <td>
        <div className="actions d-flex align-items-center">
          <i
            onClick={props.onApprovedUser}
            className={
              !props.pending
                ? "material-icons text-success pointer"
                : "material-icons-outlined text-muted pointer"
            }
          >
            verified_user
          </i>
          <i className="material-icons pointer ml-2">delete</i>
        </div>
      </td>
    </tr>
  );
};

export default HospitalUserTable;
