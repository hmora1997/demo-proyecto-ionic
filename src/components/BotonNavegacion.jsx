import React from "react";
import { useHistory } from "react-router-dom";

const BotonNavegacion = ({ texto, ruta, colorButton, disabled, onClick }) => {
  if (!colorButton) colorButton = "button-blue mx-0";
  const history = useHistory();

  const handleOnClick = () => {
    if (!disabled) {
      if (onClick) {
        onClick();
      } else if (ruta) {
        history.push(ruta);
      }
    }
  };

  return (
    <button
      className={`btn w-100 text-white px-0 mb-3 fw-bold ${colorButton} rounded-0 ${disabled ? 'disabled' : ''}`}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {texto}
    </button>
  );
};

export default BotonNavegacion;
