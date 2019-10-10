import React, { useState,  useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import to from "await-to-js";
import { omit } from 'lodash';

import { config } from "../config";
import { AuthContext } from "../context/authContext";
import { ModalContext } from "../context/modalContext";

import { SINGLE_HOSPITAL } from "../graphql/Query";
import { UPLOAD_FILE } from "../graphql/Mutation";
import { HOSPITAL_UPDATE_MUTATION } from "../graphql/Mutation";

import Layout from "../hoc/Layout";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import FileUpload from "../components/forms/FileUpload";
import UpdateHospital from '../components/forms/UpdateHospital';


//import img from '../img/image-placeholder.jpg';

function Hospital() {
  const { user } = useContext(AuthContext);
  const { show, openModal, closeModal } = useContext(ModalContext);

  const [specialtiesValue, setSpecialtiesValue] = useState("");
  const [hospital, setHospital] = useState({});

  const { loading, data } = useQuery(SINGLE_HOSPITAL, {
    variables: { id: user.hospital }
  });

  const [singleUpload] = useMutation(UPLOAD_FILE);
  const [updateHospital] = useMutation(HOSPITAL_UPDATE_MUTATION, {
    refetchQueries: [
      { query: SINGLE_HOSPITAL, variables: { id: user.hospital } }
    ]
  });

  const handleFile = async e => {
    const [file] = e.target.files;
    const { name } = e.target;
    let hospital = data.hospital;
    hospital = omit(hospital, ['__typename']);
    // Upload mutation for get the hospital logo/coverphoto
    const [,response] = await to(
      singleUpload({
        variables: {
          file,
          id: hospital.id,
          type: name
        }
      })
    );

    const { data: { singleUpload: { filename } } } = response;
    const filePath = config.staticUrl + filename

    await to(
      updateHospital({
        variables: {
          id: hospital.id,
          update: {
            ...hospital,
            coverphoto: name === 'coverphoto' ? filePath : hospital.coverphoto,
            logo: name === 'logo' ? filePath : hospital.logo
          }
        }
      })
    );
  };

  // Add hospital data to local variable for manipulate
  let hostpitalFromQuery;
  if (!loading) {
    hostpitalFromQuery = data.hospital;
    hostpitalFromQuery = omit(hostpitalFromQuery, ["__typename"]);
  }

  // When modal open setHospital to hostpitalFromQuery
  const openEditModal = () => {
    setHospital(hostpitalFromQuery);
    setSpecialtiesValue(hostpitalFromQuery.specialties.join());
    openModal();
  }

  const onChangeValue = (e) => {
    const { name, value } = e.target;

    // Take a special care for specialties
    if (name === 'specialties') {
      setSpecialtiesValue(value);
      const newSpecialtiesValue = value.split(',').map(item => item.trim());

      setHospital({
        ...hospital,
        specialties: newSpecialtiesValue
      });

    } else {
      setHospital({ ...hospital, [name]: value });
    }
  };

  // Update hospital function
  const onUpdateHospital = async (e) => {
    e.preventDefault();

    await to(
      updateHospital({
        variables: {
          id: data.hospital.id,
          update: hospital,
        }
      })
    );
    closeModal();
  };

  // If loading return loader component
  if (loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  return (
    <Layout>
      <div className="card bg-white text-white">
        <div
          className="overlay-img bg-primary text-right p-2"
          style={{
            background:
              "url(" + data.hospital.coverphoto + ") center center no-repeat"
          }}
        >
          <div className="card-img-overlay">
            <FileUpload onChange={handleFile} name="coverphoto" user={user} />
          </div>
        </div>
        <div
          className="upload-logo bg-light"
          style={{
            background:
              "url(" + data.hospital.logo + ") center center no-repeat"
          }}
        >
          <FileUpload onChange={handleFile} name="logo" user={user} />
        </div>
        <div className="card-body">
          <h2 className="d-flex align-items-center justify-content-between">
            {data.hospital.name}
            {user.role === "admin" ? (
              <Button onClick={openEditModal} text="Edit" btnSize="sm" />
            ) : null}
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

        <UpdateHospital
          show={show}
          onClose={closeModal}
          onChange={onChangeValue}
          hospital={hospital}
          speciatiesValue={specialtiesValue}
          onSubmit={onUpdateHospital}
        />
      </div>
    </Layout>
  );
}

export default Hospital;
