import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonActionSheet,
  IonToast,
} from "@ionic/react";
import { chevronForwardOutline, closeOutline } from 'ionicons/icons';
import BotonNavegacion from "./BotonNavegacion";
import UsuarioActual from "./UsuarioActual";
import "./menu-home.css";

const MenuHome = () => {
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("danger");
  const [showActionSheet, setShowActionSheet] = useState(false);

  const actionSheetButtons = [
    {
      text: 'EPP entregados',
      handler: () => {
        history.push('/consulta/epp_entregado');
      },
      icon: chevronForwardOutline,
      iconSlot: 'end'
    },
    {
      text: 'Trabajadores con Insumos Pendientes',
      handler: () => {
        history.push('/consulta/epp_pendientes');
      },
      icon: chevronForwardOutline,
      iconSlot: 'end'
    },
    // {
    //   text: 'Trabajadores con Insumos Vencidos',
    //   handler: () => {
    //     history.push('/consulta/epp_vencidos');
    //   },
    //   icon: chevronForwardOutline,
    //   iconSlot: 'end'
    // },
    // {
    //   text: 'Insumos Vencidos para el Trabajador',
    //   handler: () => {
    //     history.push('/consulta/insumos_vencidos');
    //   },
    //   icon: chevronForwardOutline,
    //   iconSlot: 'end'
    // },
    // {
    //   text: 'Insumos Pendientes para el Trabajador',
    //   handler: () => {
    //     history.push('/consulta/insumos_pendientes');
    //   },
    //   icon: chevronForwardOutline,
    //   iconSlot: 'end'
    // },
    {
      text: 'Cancelar',
      role: 'cancel',
      icon: closeOutline,
    }
  ];

  return (
    <IonContent className="page-color">
      <UsuarioActual />
      <div className="container-fluid px-4 mt-4">
        <h2 className="mb-3">Entregar EPP o Insumos</h2>
        <BotonNavegacion
          texto="Entregar EPPs o Insumos"
          ruta="/entrega-epp-insumos"
        />
        <BotonNavegacion
          texto="Consulta en Línea"
          onClick={() => setShowActionSheet(true)}
          expand="block"
        />
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          header="Selecciona una Consulta"
          buttons={actionSheetButtons}
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          color={toastColor}
          duration={2000}
        />
      </div>
    </IonContent>
  );
};

export default MenuHome;
