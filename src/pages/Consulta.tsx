import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import ConsultaLinea from "../components/ConsultaLinea";
import Header from "../components/Header";

const Consulta: React.FC = () => {
  const [username] = useState("admin@admin.cl"); // Aquí definimos el nombre de usuario estáticamente

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <ConsultaLinea />
      </IonContent>
    </IonPage>
  );
};

export default Consulta;
