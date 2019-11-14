import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import to from "await-to-js";
import { toast } from 'react-toastify';

import Loading from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import Modal from "../../components/modal/Modal";
import CreateAdmin from "../../components/forms/CreateAdmin";
import Table from "../../components/ui/Table";

import { SINGLE_HOSPITAL, HOSPITAL_ADMIN } from "../../graphql/Query";
import { REGISTER_MUTATION, REMOVE_USER_MUTATION } from "../../graphql/Mutation";
import { ModalContext } from "../../context/modalContext";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "admin",
  hospital: "",
  pending: false
};

function HospitalEdit({ match }) {
  const [adminData, setAdminData] = useState(initialState);

  const [adminError, setAdminError] = useState({
    error: false,
    msg: ""
  });

  const { show, openModal, closeModal } = useContext(ModalContext);

  const { loading, data } = useQuery(SINGLE_HOSPITAL, {
    variables: { id: match.params.id }
  });

  const { loading: adminLoading, data: admin } = useQuery(HOSPITAL_ADMIN, {
    variables: { id: match.params.id }
  });

  if (!adminLoading) {
    console.log(admin);
  }

  const [addUser] = useMutation(REGISTER_MUTATION, {
    refetchQueries: [
      {
        query: HOSPITAL_ADMIN,
        variables: { id: match.params.id }
      }
    ]
  });

  const [removeUser] = useMutation(REMOVE_USER_MUTATION, {
    refetchQueries: [
      {
        query: HOSPITAL_ADMIN,
        variables: { id: match.params.id }
      }
    ]
  });

  const onChangeInput = e => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };



  const onCreateAdmin = async e => {
    e.preventDefault();
    console.log(adminData);
    let [err] = await to(
      addUser({
        variables: {
          userInput: { ...adminData, hospital: data.hospital.id }
        }
      })
    );

    if (err !== null) {
      return setAdminError({
        error: true,
        msg: err.graphQLErrors[0].message
      });
    }

    setAdminData(initialState);
    toast.success('Admin created!');
    closeModal();
  };

  const removeAdmin = async (user) => {
    let [err, response] = await to(
      removeUser({
        variables: { id: user.id }
      })
    );

    if (err) return;
    toast.success(response.data.removeUser);
  };

  if (loading || adminLoading) return <Loading />;

  return (
    <>
      <div className="card bg-white text-white">
        <div
          className="overlay-img bg-primary text-right p-2"
          style={{
            background:
              "url(" + data.hospital.coverphoto + ") center center no-repeat"
          }}
        ></div>
        <div
          className="upload-logo bg-light"
          style={{
            background:
              "url(" + data.hospital.logo + ") center center no-repeat"
          }}
        ></div>
        <div className="card-body">
          <h2 className="d-flex align-items-center justify-content-between">
            {data.hospital.name}
            <Button text="Add Admin" onClick={openModal} />
          </h2>
          <p className="text-dark pb-2">{data.hospital.location}</p>

          {data.hospital.specialties &&
            data.hospital.specialties.map((item, i) => (
              <div key={i} className="badge badge-outline-primary mr-2">
                {item}
              </div>
            ))}
          <p className="text-dark pt-5 pb-5">{data.hospital.description}</p>

          <h4>Admin User lists</h4>
          {admin.getHospitalAdmin.length > 0 ? (
            <Table thead={["", "First name", "Last name", "email", "Action"]}>
              {admin.getHospitalAdmin.map(user => (
                <tr key={user.id}>
                  <td className="py-1">
                    <div
                      className="avatar bg-primary"
                      style={{
                        background:
                          "url(" + user.avatar + ") center center no-repeat",
                        width: `${36}px`,
                        height: `${36}px`
                      }}
                    ></div>
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td><i
                    className="material-icons pointer ml-2 pointer"
                    onClick={() => removeAdmin(user)}
                  >delete</i></td>
                </tr>
              ))}
            </Table>
          ) : (
            <p className="alert alert-warning">
              No admin added for this hospital yet
            </p>
          )}
        </div>
      </div>

      <Modal
        show={show}
        onClose={closeModal}
        title={`Create Admin for ${data.hospital.name}`}
      >
        <CreateAdmin
          adminFirstnameValue={adminData.firstName}
          adminLastnameValue={adminData.lastName}
          adminEmailValue={adminData.email}
          adminPasswordValue={adminData.password}
          onChange={onChangeInput}
          error={adminError.error}
          errorMsg={adminError.msg}
          onSubmit={onCreateAdmin}
        />
      </Modal>
    </>
  );
}

export default HospitalEdit;
