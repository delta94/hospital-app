import React, {useContext} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import to from 'await-to-js';

import { config } from '../config';

import { AuthContext } from '../context/authContext';

import { SINGLE_HOSPITAL } from '../graphql/Query';
import { UPLOAD_FILE } from "../graphql/Mutation";
import { HOSPITAL_UPDATE_MUTATION } from '../graphql/Mutation';

import Layout from '../hoc/Layout';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';

//import img from '../img/image-placeholder.jpg';


function Hospital() {
  const { user } = useContext(AuthContext);

  const { loading, data} = useQuery(SINGLE_HOSPITAL, {
    variables: {id: user.hospital}
  });

  const [singleUpload] = useMutation(UPLOAD_FILE);
  const [updateHospital] = useMutation(HOSPITAL_UPDATE_MUTATION, {
    refetchQueries: [{ query: SINGLE_HOSPITAL, variables: {id: user.hospital} }]
  });


  const handleFile = async (e) => {
    const [file] = e.target.files;
    // Upload mutation for get the
    const [, response] = await to(singleUpload({
      variables: {
        file,
        id: data.hospital.id,
        type: e.target.name
      }
    }));

    await to(
      updateHospital({
        variables: {
          id: data.hospital.id,
          update: {
            name: data.hospital.name,
            coverphoto: config.staticUrl + response.data.singleUpload.filename
          }
        }
      })
    );
  };

  if (loading)
    return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <div className="card bg-dark text-white">
        <div
          className="overlay-img text-right p-2"
          style={{ background: "url("+ data.hospital.coverphoto + ") center center no-repeat" }}
        >
        {user.role === 'admin' ? <Button text="Edit" btnSize="sm"/> : null}

        </div>
        <div className="card-img-overlay d-flex align-items-center justify-content-center flex-column">
          <h2 className="fc-white">{data.hospital.name}</h2>
          <p className="card-text">{data.hospital.location}</p>
        </div>

      </div>

        <input type="file" name="coverphoto" onChange={handleFile}/>
    </Layout>
  );
};

export default Hospital;
