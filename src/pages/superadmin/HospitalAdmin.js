import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import to from "await-to-js";

import Loading from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import Modal from "../../components/modal/Modal";
import CreateAdmin from "../../components/forms/CreateAdmin";

import { SINGLE_HOSPITAL, HOSPITAL_ADMIN } from "../../graphql/Query";
import { REGISTER_MUTATION } from "../../graphql/Mutation";
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
    variables: { id: match.params.id },
  });

  if (!adminLoading) {
    console.log(admin);
  }

  const [addUser] = useMutation(REGISTER_MUTATION);

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
    closeModal();
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

          <p className="text-dark pt-5">{data.hospital.description}</p>
        </div>

        {admin.getHospitalAdmin.length > 0 ?
          admin.getHospitalAdmin.map(user => <h5 key={user.id}>{user.firstName} </h5>)
          : <p>No admin created yet.</p>
        }
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
