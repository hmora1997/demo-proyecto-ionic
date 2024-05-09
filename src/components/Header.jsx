// CustomHeader.jsx
import React from "react";
import { IonHeader, IonToolbar } from "@ionic/react";
import Logo from "./Logo";

const Header = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <div className="d-flex justify-content-between align-items-center px-5">
          <h3 className="m-0 fs-5 fs-md-3">Gestión de Insumos - Garcia</h3>
          <Logo redirect={'/home'}>
            Logito
          </Logo>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
