import React from "react";
import { useHistory } from "react-router-dom";
import { IonButton } from "@ionic/react";

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
    <IonButton
      
      onClick={handleOnClick}
      className={`w-100 mx-0 mb-4 fw-bold ${colorButton}`}
      disabled={disabled}
    >
      {texto}
    </IonButton>
  );
};

export default BotonNavegacion;
