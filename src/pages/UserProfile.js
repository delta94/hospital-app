import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { omit, includes, filter } from "lodash";
import to from "await-to-js";

import { getItemFromLocal } from "../utils/localStorage";
import { config } from "../config";

import { USER_QUERY } from "../graphql/Query";
import { UPLOAD_FILE, UPDATE_USER_MUTATION } from "../graphql/Mutation";

import FileUpload from "../components/forms/FileUpload";
import Loader from "../components/ui/Loader";
import Input from "../components/forms/Input";
import Textarea from "../components/forms/TextArea";
import Button from "../components/ui/Button";

const UserProfile = () => {
  const localuser = getItemFromLocal("user");

  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [doctorSpecialties, setDoctorSpecialties] = useState('');

  const { loading } = useQuery(USER_QUERY, {
    variables: { id: localuser._id },
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      setUser(data.user)
      setDoctorSpecialties(data.user.specialties.join());
    }
  });

  const [singleUpload] = useMutation(UPLOAD_FILE);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries: [
      {
        query: USER_QUERY,
        variables: { id: localuser._id }
      }
    ]
  });

  const handleFile = async e => {
    const [file] = e.target.files;
    const { name } = e.target;
    let userData = { ...user };
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

  const onChange = e => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
      return;
    }

    if (name === "specialties") {
      setDoctorSpecialties(value);
      const specialtiesArray = value.split(",").map(item => item.trim());

      return setUser({
        ...user,
        specialties: specialtiesArray
      });
    }

    setUser({ ...user, [name]: value });
  };
  const onUpdateInfo = async e => {
    e.preventDefault();
    let userInfo = { ...user };
    userInfo = omit(userInfo, ["__typename"]);
    if (password === "") {
      userInfo.password = user.password;
    } else {
      userInfo.password = password;
    }

    await to(
      updateUser({
        variables: {
          id: user.id,
          userInput: userInfo
        }
      })
    );
  };

  const onSelectDay = e => {
    const { value } = e.currentTarget;
    if (includes(user.availableDays, value)) {
      const availableDays = filter(user.availableDays, item => item !== value);
      return setUser({ ...user, availableDays: availableDays });
    }
    setUser({ ...user, availableDays: [...user.availableDays, value] });
  };

  if (loading) return <Loader />;

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
                  <p>{user.bio}</p>
                </div>
              </div>

              <div className="py-9">
                <p className="clearfix pt-4">
                  <span className="float-left">Mail:</span>
                  <span className="float-right text-muted">{user.email}</span>
                </p>
                {user.phone ? (
                  <p className="clearfix">
                    <span className="float-left">Phone:</span>
                    <span className="float-right text-muted">{user.phone}</span>
                  </p>
                ) : null}

                {user.availableDays && user.availableDays.length > 0 ? (
                  <p className="clearfix">
                    <span className="float-left">Available days:</span>
                    {user.availableDays.map(day => (
                      <span className="float-right text-muted" key={day}>
                        {day},
                      </span>
                    ))}
                  </p>
                ) : null}
                {user.specialties && user.specialties.length > 0 ? (
                  <p className="clearfix">
                    <span className="float-left">Specialties:</span>
                    {user.specialties.map(day => (
                      <span className="float-right text-muted" key={day}>
                        {day},
                      </span>
                    ))}
                  </p>
                ) : null}
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

                <Textarea
                  label="Short Bio"
                  name="bio"
                  value={user.bio}
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
                  label="Phone"
                  name="phone"
                  value={user.phone}
                  onChange={onChange}
                  className="form-control"
                  bm={true}
                />

                {user.role === "doctor" ? (
                  <>
                    <div className="form-group mb-0">
                      <label>Available days</label>
                    </div>
                    <div className="form-group d-flex">
                      {allDays.map(day => (
                        <div className="form-check mr-3" key={day}>
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={day}
                              value={day}
                              onChange={onSelectDay}
                              checked={includes(user.availableDays, day)}
                            />
                            {day}
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      ))}
                    </div>

                    <Input
                      label="Specialties"
                      name="specialties"
                      value={doctorSpecialties}
                      onChange={onChange}
                      className="form-control"
                      bm={true}
                      placeholder="Write specialties seperated by comma"
                    />
                  </>
                ) : null}

                <Input
                  label="Change password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChange}
                  className="form-control"
                  bm={true}
                />

                <Button type="submit" text="Update profile" loading={loading} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
