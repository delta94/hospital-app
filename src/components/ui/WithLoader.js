import React from 'react';
import Loader from './Loader';

const WithLoader = ({loading, children}) => {
  if (loading) return <Loader />;

  return <>{children}</>;
}

export default WithLoader;
