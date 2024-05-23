import React from "react";
import { IonContent } from "@ionic/react";
import BotonNavegacion from "./BotonNavegacion";
import UsuarioActual from "./UsuarioActual";
import "./menu-home.css";

const MenuHome = () => {
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
          ruta="/consulta"
          disabled
        />
      </div>
    </IonContent>
  );
};

export default MenuHome;
