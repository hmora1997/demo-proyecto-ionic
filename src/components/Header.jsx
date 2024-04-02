// CustomHeader.jsx
import React from "react";
import { IonHeader, IonToolbar } from "@ionic/react";

const Header = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <div className="d-flex justify-content-between align-items-center px-5">
          <h3 className="m-0 fs-5 fs-md-3">Gestión de Insumos - CBS</h3>
          <img
            src="../public/logo-cbs.png"
            alt="Logo"
            routerLink="/home"
            className="ms-3 logo-header" // Asegúrate de que la clase logo-header esté definida en tu CSS
          />
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
