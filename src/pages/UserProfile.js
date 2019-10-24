import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { omit } from 'lodash';
import to from 'await-to-js';

import { getItemFromLocal } from '../utils/localStorage';
import { config } from '../config';

import { USER_QUERY } from '../graphql/Query';
import { UPLOAD_FILE, UPDATE_USER_MUTATION } from '../graphql/Mutation';

import FileUpload from '../components/forms/FileUpload';
import Loader from '../components/ui/Loader';
import Input from '../components/forms/Input';
import Button from '../components/ui/Button';

const UserProfile = () => {
  const localuser = getItemFromLocal('user');

  const [user, setUser] = useState({});
  const [password, setPassword] = useState('')

  const { loading } = useQuery(USER_QUERY, {
    variables: { id: localuser._id },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => setUser(data.user)
  });

  const [singleUpload] = useMutation(UPLOAD_FILE);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries: [{
      query: USER_QUERY,
      variables: { id: localuser._id }
    }]
  });

  const handleFile = async e => {
    const [file] = e.target.files;
    const { name } = e.target;
    let userData = {...user};
    userData = omit(userData, ["__typename"]);
    // Upload mutation for get the hospital logo/coverphoto
    const [, response] = await to(
      singleUpload({
        variables: {
          file,
          id: userData.id,
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
          id: userData.id,
          userInput: {
            ...userData,
            avatar: filePath
          }
        }
      })
    );
    setUser({ ...user, avatar: filePath });
    //console.log(err.networkError.result.errors);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
      return;
    }

    setUser({ ...user, [name]: value });
  }
  const onUpdateInfo = async (e) => {
    e.preventDefault();
    let userInfo = {...user};
    userInfo = omit(userInfo, ["__typename"])
    if (password === '') {
      userInfo.password = user.password;
    } else {
      userInfo.password = password;
    }

    await to(
      updateUser({
        variables: {
          id: user.id,
          userInput: userInfo,
        }
      })
    );
  };

  if (loading)
    return <Loader />;

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-3">
              <div className="border-bottom pb-4">
                <div className="user-avatar bg-primary">
                  <img src={user.avatar} alt="" />
                  <FileUpload onChange={handleFile} name="avatar" />
                </div>
                <div className="mb-2">
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
              </div>

              <div className="py-9">
                <p className="clearfix pt-4">
                  <span className="float-left">Mail</span>
                  <span className="float-right text-muted">{user.email}</span>
                </p>
              </div>
            </div>
            <div className="col-lg-8">
              <h3 className="pb-4">Update profile</h3>
              <form action="" onSubmit={onUpdateInfo}>
                <Input
                  label="First name"
                  name="firstName"
                  value={user.firstName}
                  onChange={onChange}
                  className="form-control"
                  bm={true}
                />
                <Input
                  label="Last name"
                  name="lastName"
                  value={user.lastName}
                  onChange={onChange}
                  className="form-control"
                  bm={true}
                />
                <Input
                  disabled={true}
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={onChange}
                  className="form-control"
                  bm={true}
                />

                <Input
                  label="Change password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChange}
                  className="form-control"
                  bm={true}
                />

                <Button
                  type="submit"
                  text="Update profile"
                  loading={loading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
