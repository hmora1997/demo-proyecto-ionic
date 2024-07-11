import React from 'react';
import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import MenuEpp from "../components/MenuEpp";
import Header from "../components/Header"

const HomePageEpp: React.FC = () => {
  return (
    <IonPage>
    <Header showBackButton={true} />
    <IonContent fullscreen>
      <MenuEpp />
    </IonContent>
  </IonPage>
  );
};

export default HomePageEpp;
