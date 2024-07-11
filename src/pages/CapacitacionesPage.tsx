import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import Header from "../components/Header";
import Capacitaciones from "../components/insertarCapacitaciones/Capacitaciones";

const CapacitacionesPage: React.FC = () => {
  return (
    <IonPage>
      <Header showBackButton={true} />
      <IonContent fullscreen>
        <Capacitaciones />
      </IonContent>
    </IonPage>
  );
};

export default CapacitacionesPage;
