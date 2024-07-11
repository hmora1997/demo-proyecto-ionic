import React from 'react';
import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import Header from "../components/Header"
import MenuCapacitaciones from '../components/MenuCapacitaciones';

const HomePageCapacitaciones: React.FC = () => {
  return (
    <IonPage>
    <Header showBackButton={true} />
    <IonContent fullscreen>
      <MenuCapacitaciones />
    </IonContent>
  </IonPage>
  );
};

export default HomePageCapacitaciones;
