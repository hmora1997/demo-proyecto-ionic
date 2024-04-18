import React from 'react';
import { useHistory } from 'react-router-dom';

const BotonNavegacion = ({ texto, ruta }) => {
  const history = useHistory();

  const handleOnClick = () => {
    history.push(ruta);
  };

  return (
    <button
      className="btn w-100 text-white px-0 mx-0 mb-3 fw-bold button-blue rounded-0"
      onClick={handleOnClick}
    >
      {texto}
    </button>
  );
};

export default BotonNavegacion;
