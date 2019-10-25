import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import to from "await-to-js";

import { LOGIN_MUTATION } from "../graphql/Mutation";

import Input from "../components/forms/Input";
import AuthWrapper from "../hoc/AuthWrapper";
import Error from "../components/ui/Error";

import { setTokenToLocal, getItemFromLocal } from "../utils/localStorage";

import bg from "../img/authbg.jpg";

function Login({ history }) {
  const [authData, setAuthData] = useState({
    role: "manager",
    email: "",
    password: "",
    error: false,
    msg: ""
  });

  const [authUser] = useMutation(LOGIN_MUTATION);

  const onInputChange = e => {
    const { name, value } = e.target;
    if (name === "role") {
      setAuthData({ ...authData, role: e.currentTarget.value });
    }
    setAuthData({ ...authData, [name]: value });
  };

  /**
   * onSubmitForm function
   *
   */
  const onSubmitForm = async e => {
    e.preventDefault();
    let err, response;

    [err, response] = await to(
      authUser({
        variables: {
          email: authData.email,
          password: authData.password
        }
      })
    );

    //If error populate authError state
    if (err !== null) {
      return setAuthData({
        ...authData,
        error: true,
        msg: err.graphQLErrors[0].message
      });
    }

    //save it to localstorage.
    setTokenToLocal.token(response.data.authUser);
    setTokenToLocal.user(response.data.authUser);
    // Push user to home page

    const user = await getItemFromLocal("user");
    if (user.role === "superadmin") return history.push("/");

    if (user.pending) return history.push("/pending");
    history.push("/");
  };

  return (
    <AuthWrapper bg={bg}>
      <form className="pt-3" onSubmit={onSubmitForm}>
        <div className="form-group">
          <Input
            type="email"
            value={authData.email}
            onChange={onInputChange}
            name="email"
            className="form-control form-control-lg"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <Input
            type="password"
            value={authData.password}
            onChange={onInputChange}
            name="password"
            className="form-control form-control-lg"
            placeholder="Password"
          />
        </div>

        <Error err={authData.error} msg={authData.msg} />

        <div className="mt-3">
          <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
            Login
          </button>
        </div>
        <div className="my-2 d-flex justify-content-between align-items-center">
          <div className="form-check">
            <label className="form-check-label text-muted">
              <input type="checkbox" className="form-check-input" />
              Keep me signed in
              <i className="input-helper"></i>
            </label>
          </div>
          {/* <Link to="/forgot-password" className="auth-link text-black">
            Forgot password?
          </Link> */}
        </div>
        <div className="text-center mt-4 font-weight-light">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Create
          </Link>
        </div>
      </form>
    </AuthWrapper>
  );
}

export default Login;
