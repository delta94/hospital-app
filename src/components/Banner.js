import React from 'react';

const Banner = ({img, text, small}) => {
  const className = small ? 'small' : '';
  return (
    <div className={"banner d-flex align-items-center justify-content-center " + className} style={{ background: 'url(' + img + ') center center no-repeat'}}>
      <h1 className="text-white text-center text-capitalize" dangerouslySetInnerHTML={{__html: text}}></h1>
    </div>
  );
}

export default Banner;
