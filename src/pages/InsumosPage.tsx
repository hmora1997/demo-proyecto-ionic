import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import EppInsumos from "../components/EppInsumos";
import Header from "../components/Header";

const InsumosPage: React.FC = () => {
  return (
    <IonPage>
      <Header showBackButton={true} />
      <IonContent fullscreen>
        <EppInsumos />
      </IonContent>
    </IonPage>
  );
};

export default InsumosPage;
