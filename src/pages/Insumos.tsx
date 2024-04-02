import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import EppInsumos from "../components/EppInsumos";
import Header from "../components/Header";

const Insumos: React.FC = () => {
  const [username] = useState("admin@admin.cl"); // Aquí definimos el nombre de usuario estáticamente

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <EppInsumos />
      </IonContent>
    </IonPage>
  );
};

export default Insumos;
