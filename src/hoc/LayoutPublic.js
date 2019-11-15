import React from 'react';

import Header from '../components/Header';
import Banner from '../components/Banner';

const LayoutPublic = ({bg, text, small, children}) => {
  return (
    <>
      <Header />
      <Banner bg={bg} text={text} small={small} />
      {children}
    </>
   );
}

export default LayoutPublic;
