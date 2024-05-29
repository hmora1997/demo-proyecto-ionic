import React, { useState } from "react";
import { IonContent, IonPage, IonButton, IonToast } from "@ionic/react";
import BotonNavegacion from "./BotonNavegacion";
import UsuarioActual from "./UsuarioActual";
function MenuConsulta() {

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("danger");

  const handleButtonClick = (path) => {
    if (path === "/home") {
      navigateTo(path);
    } else {
      setToastMessage("Esta funcionalidad está en proceso.");
      setToastColor("danger");
      setShowToast(true);
    }
  };
  return (
    <IonContent className=" page-color">
      <UsuarioActual usuario="admin@admin.cl" />

      <div className="container-fluid px-5 mt-4">
        <h2 className=" mb-3">Consulta en Línea</h2>
        <BotonNavegacion texto="Insumos entregados"
          onClick={() => handleButtonClick("/insumos-entregados")}
        />
        <BotonNavegacion
          texto="Trabajadores con Insumos Vencidos"
          onClick={() => handleButtonClick("/trabajadores-insumos-vencidos")}
        />
        <BotonNavegacion
          texto="Trabajadores con Insumos Pendientes"
          onClick={() => handleButtonClick("/trabajadores-insumos-pendientes")}
        />
        <BotonNavegacion
          texto="Insumos Vencidos para el Trabajador"
          onClick={() => handleButtonClick("/insumos-vencidos-trabajador")}
        />
        <BotonNavegacion
          texto="Insumos Pendientes para el Trabajador"
          onClick={() => handleButtonClick("/insumos-pendientes-trabajador")}
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastColor}
          position="top"
        />
      </div>
    </IonContent>
  );
}

export default MenuConsulta;
