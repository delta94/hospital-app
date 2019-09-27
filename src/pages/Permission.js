import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../hoc/Layout';

function Permission() {
  return (
    <Layout>
      <h2>You do not have permission to access this page</h2>
      <Link to="/">Return to home</Link>
    </Layout>
  )
}

export default Permission;
