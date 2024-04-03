import React from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import "./menu-user.css";

const UserMenu = () => {
  return (
      <IonContent className=" page-color">
        <div className="color-usuario w-100 text-white text-start ps-5 mb-3">
          <span className="fw-bold"> Usuario Actual:</span> admin@admin.cl
        </div>
          <h2 className=" mb-3">Entregar EPP o Insumos</h2>
        <div className="container-fluid px-5 mt-4">

          <a className="btn w-100 text-white px-0 mx-0 mb-3 fw-bold button-blue " href="/entrega-epp-insumos"  expand="block">
            Entregar EPPs o Insumos
          </a>
          <button className="btn w-100 text-white px-0 mx-0 mb-3 fw-bold button-blue " expand="block">
            Consulta en Línea
          </button>

          <a className="btn w-100 text-white px-0 mx-0 mb-3 fw-bold button-blue " href="/login" expand="block">
            Cerrar Sesión
          </a>
        </div>
      </IonContent>
  );
};

export default UserMenu;
