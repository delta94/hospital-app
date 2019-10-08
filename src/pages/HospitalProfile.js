import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import to from "await-to-js";
import { omit } from 'lodash';

import { config } from "../config";
import { AuthContext } from "../context/authContext";

import { SINGLE_HOSPITAL } from "../graphql/Query";
import { UPLOAD_FILE } from "../graphql/Mutation";
import { HOSPITAL_UPDATE_MUTATION } from "../graphql/Mutation";

import Layout from "../hoc/Layout";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import FileUpload from "../components/forms/FileUpload";

//import img from '../img/image-placeholder.jpg';

function Hospital() {
  const { user } = useContext(AuthContext);

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
    // Upload mutation for get the
    const [err,response] = await to(
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

    console.log(hospital);



    const [error, res] = await to(
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

    //console.log("error", error.networkError.result.errors);
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
          {user.role === "admin" ? <Button text="Edit" btnSize="sm" /> : null}
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
          <h2 className="fc-white">{data.hospital.name}</h2>
          <p className="card-text">{data.hospital.location}</p>
        </div>
      </div>
    </Layout>
  );
}

export default Hospital;
