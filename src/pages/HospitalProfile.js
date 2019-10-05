import React, {useContext} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import to from 'await-to-js';

import Layout from '../hoc/Layout';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';

import { AuthContext } from '../context/authContext';

import { SINGLE_HOSPITAL } from '../graphql/Query';
import { UPLOAD_FILE } from "../graphql/Mutation";

//import img from '../img/image-placeholder.jpg';


function Hospital() {
  const { user } = useContext(AuthContext);

  const { loading, data} = useQuery(SINGLE_HOSPITAL, {
    variables: {id: user.hospital}
  });

  const [singleUpload] = useMutation(UPLOAD_FILE);

  console.log(data);

  const handleFile = async (e) => {
    const [file] = e.target.files;
    await to(singleUpload({ variables: { file } }));
    console.log(file);
  };

  if (loading)
    return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <div className="card bg-dark text-white">
        <div
          className="overlay-img text-right p-2"
          //style={{ background: "url("") center center no-repeat" }}
        >
        {user.role === 'admin' ? <Button text="Edit" btnSize="sm"/> : null}

        </div>
        <div className="card-img-overlay d-flex align-items-center justify-content-center flex-column">
          <h2>{data.hospital.name}</h2>
          <p className="card-text">{data.hospital.location}</p>
        </div>

      </div>

        <input type="file" onChange={handleFile}/>
    </Layout>
  );
};

export default Hospital;
