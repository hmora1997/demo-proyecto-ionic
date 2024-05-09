import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import Header from "../components/Header";
import MenuPrincipal from "../components/MenuPrincipal";

const MenuPrincipalPage: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <MenuPrincipal />
      </IonContent>
    </IonPage>
  );
};

export default MenuPrincipalPage;
