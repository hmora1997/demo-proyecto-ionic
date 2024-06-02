import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import MenuConsulta from "../components/MenuConsulta";
import Header from "../components/Header";

const ConsultaPage: React.FC = () => {
  return (
    <IonPage>
      <Header showBackButton={true}  />
      <IonContent fullscreen>
        <MenuConsulta />
      </IonContent>
    </IonPage>
  );
};

export default ConsultaPage;
