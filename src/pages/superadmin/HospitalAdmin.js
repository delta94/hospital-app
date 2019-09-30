import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../../hoc/Layout";
import Loading from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import Modal from "../../components/modal/Modal";
import CreateAdminForm from "../../components/forms/CreateAdmin";

import { SINGLE_HOSPITAL } from "../../graphql/Query";
import { ModalContext } from "../../context/modalContext";

function HospitalEdit({ match }) {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    msg: ""
  });

  const { show, openModal, closeModal } = useContext(ModalContext);

  const { loading, data } = useQuery(SINGLE_HOSPITAL, {
    variables: { id: match.params.id }
  });

  const onChangeInput = e => {
    console.log(e.target.value);

    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const onCreateAdmin = e => e.preventDefault();

  if (loading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <h3>{data.hospital.name}</h3>
          <Button text="Add Admin" onClick={openModal} />

          <Modal
            show={show}
            onClose={closeModal}
            title={`Create Admin for ${data.hospital.name}`}
          >
            <CreateAdminForm
              adminNameValue={adminData.name}
              adminEmailValue={adminData.email}
              adminPasswordValue={adminData.password}
              onChange={onChangeInput}
              error={adminData.error}
              errorMsg={adminData.msg}
              onSubmit={onCreateAdmin}
            />
          </Modal>
        </div>
        <p>{data.hospital.location}</p>
      </div>
    </Layout>
  );
}

export default HospitalEdit;
