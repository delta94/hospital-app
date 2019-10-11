import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import to from 'await-to-js';

import Input from '../components/forms/Input';
import AuthWrapper from '../hoc/AuthWrapper';

import { setTokenToLocal } from '../utils/setTokenToLocal';

import bg from "../img/authbg.jpg";
import { HOSPITAL_QUERY } from '../graphql/Query';
import { REGISTER_MUTATION } from "../graphql/Mutation";


function Register() {
  const [authData, setAuthData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'manager',
    hospital: ''
  });

  const [authError, setAuthError] = useState({
    error: false,
    msg: ''
  });

  const { loading, data } = useQuery(HOSPITAL_QUERY);
  const [addUser] = useMutation(REGISTER_MUTATION)

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === 'doctor' || name === 'manager') {
      setAuthData({ ...authData, role: value });
    } else {
      setAuthData({ ...authData, [name]: value });
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const [err, response] = await to(addUser({
      variables: {
        userInput: authData
      }
    }));

    console.log(err, response);

    // Set token and user data to localstorage
    setTokenToLocal.token(data.token);
    setTokenToLocal.user(data.token);
  }

  const getHospitalList = () => {
    if (!loading)
      return data.hospitals.map(hospital => (
        <option value={hospital.id} key={hospital.id}>
          {hospital.name}
        </option>
      ));

    return null;
  };

  return (
    <AuthWrapper bg={bg}>
      <form className="pt-3" onSubmit={onSubmit}>
        <div className="form-group">
          <Input
            type="text"
            onChange={onChangeInput}
            value={authData.firstname}
            name="firstname"
            placeholder="First name"
            className="form-control form-control-lg"
          />
        </div>
        <div className="form-group">
          <Input
            type="text"
            onChange={onChangeInput}
            value={authData.lastname}
            name="lastname"
            placeholder="Last name"
            className="form-control form-control-lg"
          />
        </div>

        <div className="form-group">
          <Input
            type="email"
            onChange={onChangeInput}
            value={authData.email}
            name="email"
            placeholder="Email"
            className="form-control form-control-lg"
          />
        </div>

        <div className="form-group">
          <Input
            type="password"
            onChange={onChangeInput}
            value={authData.password}
            name="password"
            placeholder="Password"
            className="form-control form-control-lg"
          />
        </div>

        <div className="form-group d-flex">
          <div className="form-check mr-3">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="manager"
                id="manager"
                value={authData.role}
                onChange={onChangeInput}
                checked
              />
              Manager
              <i className="input-helper"></i>
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="manager"
                id="doctor"
                value="doctor"
                onChange={onChangeInput}
              />
              Doctor
              <i className="input-helper"></i>
            </label>
          </div>
        </div>

        <div className="form-group">
          <select
            name="hospital"
            className="form-control"
            onChange={onChangeInput}
          >
            <option value="1">Select Hospital</option>
            {getHospitalList()}
          </select>
        </div>

        {authError.error ? (
          <div className="alert alert-danger" role="alert">
            {authError.msg}
          </div>
        ) : (
          ""
        )}

        <div className="mt-3">
          <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
            Register
          </button>
        </div>

        <div className="text-center mt-4 font-weight-light">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default Register;
