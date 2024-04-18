import React from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import BotonNavegacion from "./BotonNavegacion";
import UsuarioActual from "./UsuarioActual";
import "./menu-home.css";

const MenuHome = () => {
  return (
    <IonContent className=" page-color">
      <UsuarioActual usuario="admin@admin.cl" />

      <div className="container-fluid px-5 mt-4">
        <h2 className=" mb-3">Entregar EPP o Insumos</h2>

        <BotonNavegacion
          texto="Entregar EPPs o Insumos"
          ruta="/entrega-epp-insumos"
        />
        <BotonNavegacion texto="Consulta en Línea" ruta="/consulta" />
        <BotonNavegacion texto="Cerrar Sesión" ruta="/login" />
      </div>
    </IonContent>
  );
};

export default MenuHome;
