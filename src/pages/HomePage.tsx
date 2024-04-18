import React, { useState } from 'react';
import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import MenuHome from "../components/MenuHome";
import Header from "../components/Header"

const HomePage: React.FC = () => {
  return (
    <IonPage>
    <Header />
    <IonContent fullscreen>
      <MenuHome />
    </IonContent>
  </IonPage>
  );
};

export default HomePage;
