import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IonContent, IonToast } from "@ionic/react";
import BotonNavegacion from "./BotonNavegacion";
import UsuarioActual from "./UsuarioActual";
import "./menu-home.css";

const MenuHome = () => {
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("danger");

  const handleButtonClick = (ruta) => {
    setToastMessage("Esta funcionalidad está en proceso");
    setToastColor("danger");
    setShowToast(true);
  };

  return (
    <IonContent className="page-color">
      <UsuarioActual />
      <div className="container-fluid px-4 mt-4">
        <h2 className="mb-3">Entregar EPP o Insumos</h2>
        <BotonNavegacion
          texto="Entregar EPPs o Insumos"
          ruta="/entrega-epp-insumos"
        />
        <BotonNavegacion
          texto="Consulta en Línea"
          onClick={() => handleButtonClick("/consulta")}
        />
      </div>
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        color={toastColor}
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
        position="top"
      />
    </IonContent>
  );
};

export default MenuHome;
