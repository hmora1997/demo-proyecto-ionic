import React from 'react';

const BotonNavegacion = ({ texto, href }) => {
  return (
    <a
      className="btn w-100 text-white px-0 mx-0 mb-3 fw-bold button-blue rounded-0"
      href={href}
      expand="block"
    >
      {texto}
    </a>
  );
};

export default BotonNavegacion;
