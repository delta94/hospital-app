import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import to from 'await-to-js';

import Layout from "../../hoc/Layout";
import Loading from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import Modal from "../../components/modal/Modal";
import CreateAdmin from "../../components/forms/CreateAdmin";

import { SINGLE_HOSPITAL } from "../../graphql/Query";
import { REGISTER_MUTATION } from "../../graphql/Mutation";
import { ModalContext } from "../../context/modalContext";

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'admin',
  hospital: ''
}

function HospitalEdit({ match }) {
  const [adminData, setAdminData] = useState(initialState);

  const [adminError, setAdminError] = useState({
    error: false,
    msg: ''
  })

  const { show, openModal, closeModal } = useContext(ModalContext);

  const { loading, data } = useQuery(SINGLE_HOSPITAL, {
    variables: { id: match.params.id }
  });

  const [addUser] = useMutation(REGISTER_MUTATION);

  const onChangeInput = e => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const onCreateAdmin = async e => {
    e.preventDefault();
    let [err, ] = await to(
      addUser({
        variables: {
          userInput: {...adminData, hospital: data.hospital.id}
        }
      }));

    if (err) {
      return setAdminError({
        error: true,
        msg: err.graphQLErrors[0].message
      })
    };

    setAdminData(initialState);
    closeModal();
  };




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
        </div>
        <p>{data.hospital.location}</p>
      </div>
    </Layout>
  );
}

export default HospitalEdit;
