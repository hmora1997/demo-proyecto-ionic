import React from "react";
import { IonHeader, IonToolbar, IonButtons, IonBackButton } from "@ionic/react";
import Logo from "./Logo";

const Header = ({ showBackButton }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <div className="d-flex justify-content-between align-items-center px-4">
          <div className="d-flex align-items-center">
            {showBackButton && (
              <IonButtons slot="start">
                <IonBackButton defaultHref="/menu" />
              </IonButtons>
            )}
            <div>
              <h3 className="m-0 fw-bold fs-5 fs-md-3">Gestión de Insumos</h3>
              <h5 className="m-0 fs-6 fs-md-4">Constructora García</h5>
            </div>
          </div>
          <Logo redirect={'/menu'}>
            Logito
          </Logo>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
