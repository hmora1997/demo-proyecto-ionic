import React from "react";
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner } from "@ionic/react";
import "./custom-modal.css"; // Asegura que este archivo contenga tus estilos personalizados

const CustomModal = ({ isOpen, title, message, buttons, onClose, isSubmitting }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} cssClass="custom-modal" backdropDismiss={false}>
      {/* Encabezado del Modal */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding card-color d-flex flex-column justify-content-between">
        <div className="text-container mx-4 text-break">
          <p>{message}</p>
        </div>
        <div
          className="modal-buttons-container d-flex justify-content-evenly"
          style={{ width: "100%" }}
        >
          {/* Condición para mostrar botones o spinner */}
          {isSubmitting ? (
            <IonSpinner name="crescent" style={{ alignSelf: "center" }} />
          ) : (
            buttons.map((button, index) => (
              <IonButton
                key={index}
                onClick={button.handler}
                expand="block"
                fill="solid"
                className={`fw-bold button-custom-padding ${button.colorClass}`}
              >
                {button.text}
              </IonButton>
            ))
          )}
        </div>
      </IonContent>

      {/* Pie de página del Modal */}
    </IonModal>
  );
};

export default CustomModal;
