import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { 
  IonButton, 
  IonContent, 
  IonItem, 
  IonList, 
  IonPopover, 
  IonToast, 
  IonHeader, 
  IonToolbar, 
  IonTitle 
} from "@ionic/react";
import BotonNavegacion from "./BotonNavegacion";
import UsuarioActual from "./UsuarioActual";
import "./menu-home.css";

const MenuHome = () => {
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("danger");
  const [showPopover, setShowPopover] = useState(false);

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
          onClick={() => setShowPopover(true)} 
          expand="block"
        />
        <IonPopover
          className="custom-popover"
          isOpen={showPopover}
          onDidDismiss={() => setShowPopover(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Selecciona una Consulta</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>

              <IonItem  button={true} detail={false} onClick={() => history.push('/consulta/epp_entregado')}>
                EPP entregados
              </IonItem>
              <IonItem button={true} detail={false} onClick={() => history.push('/consulta/epp_pendientes')}>
                Trabajadores con Insumos Pendientes
              </IonItem>
              {/* Considera descomentar y usar los siguientes IonItem según necesites */}
              {/* <IonItem button={true} detail={false} onClick={() => history.push('/consulta/epp_vencidos')}>
                Trabajadores con Insumos Vencidos
              </IonItem>
              <IonItem button={true} detail={false} onClick={() => history.push('/consulta/')}>
                Insumos Vencidos para el Trabajador
              </IonItem>
              <IonItem button={true} detail={false} onClick={() => history.push('/consulta/')}>
                Insumos Pendientes para el Trabajador
              </IonItem> */}

          </IonContent>
        </IonPopover>
      </div>

    </IonContent>
  );
};

export default MenuHome;
