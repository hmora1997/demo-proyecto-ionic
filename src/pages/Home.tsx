import React, { useState } from 'react';
import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import MenuHome from "../components/MenuHome";
import Header from "../components/Header"

const Home: React.FC = () => {
  const [username] = useState('admin@admin.cl'); // Aquí definimos el nombre de usuario estáticamente

  return (
    <IonPage>
    <Header />
    <IonContent fullscreen>
      <MenuHome />
    </IonContent>
  </IonPage>
  );
};

export default Home;
