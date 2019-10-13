import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { omit } from 'lodash';
import to from 'await-to-js';

import { USER_QUERY } from '../graphql/Query';
import { UPLOAD_FILE, UPDATE_USER_MUTATION } from '../graphql/Mutation';

import FileUpload from '../components/forms/FileUpload';
import Loader from '../components/ui/Loader';

import { getItemFromLocal } from '../utils/localStorage';
import { config } from '../config';



const UserProfile = () => {
  const localuser = getItemFromLocal('user');

  const [userState, setUserState] = useState({});

  const { loading,  data } = useQuery(USER_QUERY, {
    variables: { id: localuser._id },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => setUserState(data.user)
  });




  const [singleUpload] = useMutation(UPLOAD_FILE);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries: [{query: USER_QUERY, variables: {id: localuser._id}}]
  });

  const handleFile = async e => {
    const [file] = e.target.files;
    const { name } = e.target;
    let user = data.user;
    user = omit(user, ["__typename"]);
    // Upload mutation for get the hospital logo/coverphoto
    const [, response] = await to(
      singleUpload({
        variables: {
          file,
          id: user.id,
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
      updateUser({
        variables: {
          id: user.id,
          userInput: {
            ...user,
            avatar: filePath
          }
        }
      })
    );
    //console.log(err.networkError.result.errors);
  };

  if (loading)
    return <Loader />;

    console.log(data);

  return (
    <>

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4">
              <div className="border-bottom text-center pb-4">
                <div className="user-avatar bg-primary" style={{ background: 'url(' + data.user.avatar + ') center center no-repeat' }}>
                  <FileUpload onChange={handleFile} name="avatar" />

                </div>
                <div className="mb-3">
                  <h3>{data.user.firstName} {data.user.lastName}</h3>
                </div>
              </div>

              <div className="py-4">
                <p className="clearfix">
                  <span className="float-left">
                    Status
                  </span>
                  <span className="float-right text-muted">
                    Active
                  </span>
                </p>
                <p className="clearfix">
                  <span className="float-left">
                    Mail
                  </span>
                  <span className="float-right text-muted">
                    Jacod@testmail.com
                  </span>
                </p>
              </div>
            </div>
            <div className="col-lg-8">



            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
