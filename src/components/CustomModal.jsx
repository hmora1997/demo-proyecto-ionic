import React from "react";
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner } from "@ionic/react";
import "./custom-modal.css";

const CustomModal = ({ isOpen, title, message, buttons, onClose, isSubmitting }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} cssClass="custom-modal" backdropDismiss={false}>
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
    </IonModal>
  );
};

export default CustomModal;
