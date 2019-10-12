import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthWrapper from '../hoc/AuthWrapper';

import bg from "../img/authbg.jpg";


function AuthPending() {

  return (
    <AuthWrapper bg={bg}>
      <h1>Your request set to pending.</h1>
      <p>Please login after some time to see hospital admin approve your
      request. <Link to='/login'>Login</Link></p>

    </AuthWrapper>
  );
};

export default AuthPending;
