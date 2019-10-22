import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import to from "await-to-js";
import { omit } from "lodash";

import { config } from "../config";
import { AuthContext } from "../context/authContext";
import { ModalContext } from "../context/modalContext";

import { SINGLE_HOSPITAL } from "../graphql/Query";
import { UPLOAD_FILE } from "../graphql/Mutation";
import { HOSPITAL_UPDATE_MUTATION } from "../graphql/Mutation";

import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import FileUpload from "../components/forms/FileUpload";
import UpdateHospital from "../components/forms/UpdateHospital";

//import img from '../img/image-placeholder.jpg';

function Hospital() {
  const { user } = useContext(AuthContext);
  const { show, openModal, closeModal } = useContext(ModalContext);

  const [specialtiesValue, setSpecialtiesValue] = useState("");
  const [hospital, setHospital] = useState({});

  const { loading } = useQuery(SINGLE_HOSPITAL, {
    variables: { id: user.hospital },
    onCompleted: data => setHospital(data.hospital)
  });

  const [singleUpload] = useMutation(UPLOAD_FILE);
  const [updateHospital] = useMutation(HOSPITAL_UPDATE_MUTATION, {
    refetchQueries: [
      { query: SINGLE_HOSPITAL, variables: { id: user.hospital }, onCompleted: data => setHospital(data.hosital) }
    ]
  });

  const handleFile = async e => {
    const [file] = e.target.files;
    const { name } = e.target;
    let hospitalData = {...hospital};
    hospitalData = omit(hospitalData, ["__typename"]);
    // Upload mutation for get the hospital logo/coverphoto
    const [, response] = await to(
      singleUpload({
        variables: {
          file,
          id: hospitalData.id,
          type: name
        }
      })
    );

    const {
      data: {
        singleUpload: { filename }
      }
    } = response;
    const filePath = config.staticUrl + filename;

    await to(
      updateHospital({
        variables: {
          id: hospitalData.id,
          update: {
            ...hospitalData,
            coverphoto:
              name === "coverphoto" ? filePath : hospitalData.coverphoto,
            logo: name === "logo" ? filePath : hospitalData.logo
          }
        }
      })
    );
  };


  // When modal open setHospital to hostpitalFromQuery
  const openEditModal = () => {
    setSpecialtiesValue(hospital.specialties.join());
    openModal();
  };

  const onChangeValue = e => {
    const { name, value } = e.target;

    // Take a special care for specialties
    if (name === "specialties") {
      setSpecialtiesValue(value);
      const newSpecialtiesValue = value.split(",").map(item => item.trim());

      setHospital({
        ...hospital,
        specialties: newSpecialtiesValue
      });
    } else {
      setHospital({ ...hospital, [name]: value });
    }
  };

  // Update hospital function
  const onUpdateHospital = async e => {
    e.preventDefault();

    let hospitalData = { ...hospital };
    hospitalData = omit(hospitalData, ["__typename"]);

    await to(
      updateHospital({
        variables: {
          id: hospital.id,
          update: hospitalData
        }
      })
    );
    closeModal();
  };

  // If loading return loader component
  if (loading) return <Loader />;

  return (
    <div className="card bg-white text-white">
      <div
        className="overlay-img bg-primary text-right p-2"
        style={{
          background:
            "url(" + hospital.coverphoto + ") center center no-repeat"
        }}
      >
        <div className="card-img-overlay">
          {user.role === 'admin'
            ? <FileUpload onChange={handleFile} name="coverphoto" />
            : null}
        </div>
      </div>
      <div
        className="upload-logo bg-light"
        style={{
          background: "url(" + hospital.logo + ") center center no-repeat"
        }}
      >
        {user.role === 'admin'
          ? <FileUpload onChange={handleFile} name="logo" user={user} />
          : null}
      </div>
      <div className="card-body">
        <h2 className="d-flex align-items-center justify-content-between">
          {hospital.name}
          {user.role === "admin" ? (
            <Button onClick={openEditModal} text="Edit" btnSize="sm" />
          ) : null}
        </h2>
        <p className="text-dark pb-2">{hospital.location}</p>

        {hospital.specialties &&
          hospital.specialties.map((item, i) => (
            <div key={i} className="badge badge-outline-primary mr-2">
              {item}
            </div>
          ))}

        <p className="text-dark pt-5">{hospital.description}</p>

        <div className="doctors-list pt-5">
          <h3>Doctors</h3>
        </div>
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
  );
}

export default Hospital;
