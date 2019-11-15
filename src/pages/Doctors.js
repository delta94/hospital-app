import React from 'react';

import LayoutPublic from '../hoc/LayoutPublic';

import bg from '../img/inner-page-banner.jpg';

const Doctors = () => {
  return (
    <LayoutPublic
      bg={bg}
      text="Doctors"
      small={true}
    >
    </LayoutPublic>
   );
}

export default Doctors;
