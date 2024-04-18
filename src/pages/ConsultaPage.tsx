import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import MenuConsulta from "../components/MenuConsulta";
import Header from "../components/Header";

const ConsultaPage: React.FC = () => {
  const [username] = useState("admin@admin.cl"); // Aquí definimos el nombre de usuario estáticamente

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <MenuConsulta />
      </IonContent>
    </IonPage>
  );
};

export default ConsultaPage;
