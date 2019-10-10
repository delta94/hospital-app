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

  let updatedHospital;
  if (!loading) {
    updatedHospital = data.hospital;
    updatedHospital = omit(updatedHospital, ["__typename"]);
  }

  const openEditModal = () => {
    setHospital(updatedHospital);
    setSpecialtiesValue(updatedHospital.specialties.join());
    openModal();
  }

  const onChangeValue = (e) => {
    const { name, value } = e.target;

    if (name === 'specialties') {
      setSpecialtiesValue(specialtiesValue + value);
      const newSpecialtiesValue = value.split(',');
      setHospital({
        ...hospital,
        specialties: hospital.specialties.concat(
          newSpecialtiesValue
        )
      });

    } else {
      setHospital({ ...hospital, [name]: value });
    }
  };

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
    //console.log(error.networkError.result.errors);
    closeModal();
  };

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
            <FileUpload onChange={handleFile} name="coverphoto" />
          </div>
        </div>
        <div
          className="upload-logo bg-light"
          style={{
            background:
              "url(" + data.hospital.logo + ") center center no-repeat"
          }}
        >
          <FileUpload onChange={handleFile} name="logo" />
        </div>
        <div className="card-body">
          <h2 className="">{data.hospital.name}</h2>
          <p className="text-dark pb-3">{data.hospital.location}</p>

          {data.hospital.specialties &&
            data.hospital.specialties.map(item => (
              <div className="badge badge-outline-primary mr-2">{item}</div>
            ))}

          <p className="text-dark pt-3">{data.hospital.description}</p>

          {user.role === "admin" ? (
            <Button onClick={openEditModal} text="Edit" btnSize="sm" />
          ) : null}
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
