import React from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import "./menu-user.css";

const UserMenu = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding page-color">
        <div className="color-usuario w-100 text-white text-start ps-5  mt-5 mb-3">
          <span className="fw-bold"> Usuario Actual:</span> admin@admin.cl
        </div>
        <div className="container-fluid px-5 mt-4">
          <h2 className=" mb-3">Entregar EPP o Insumos</h2>

          <IonButton className="mx-0 mb-3 fw-bold button-blue "    routerLink="/entrega-epp-insumos"  expand="block">
            Entregar EPPs o Insumos
          </IonButton>
          <IonButton className="mx-0 mb-3 fw-bold button-blue " expand="block">
            Consulta en Línea
          </IonButton>

          <IonButton className="mx-0 mb-3 fw-bold button-blue " routerLink="/login" expand="block">
            Cerrar Sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserMenu;
