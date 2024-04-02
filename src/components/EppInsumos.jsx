import React, { useState } from "react";

import {
  IonContent,
  IonPage,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import "./epp-insumos.css";
import CustomModal from "./CustomModal";

const EppInsumos = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalStage, setModalStage] = useState(0);

  const closeModal = () => {
    if (modalStage === 2) {
      setShowModal(false); 
      setTimeout(() => {
        setModalStage(0);
      }, 300);
    } else {
      setShowModal(false);
      setModalStage(0);
    }
  };

  const handleAccept = () => {
    setModalStage(1);
    setTimeout(() => {
      setModalStage(2);
    }, 3000);
  };

  let title, message, buttons;
  switch (modalStage) {
    case 0:
      title = "¿Está Seguro?";
      message =
        "¿Realmente desea proceder con las entregas de EPP o Insumos especificadas?";
      buttons = [
        { text: "No", handler: closeModal, colorClass: "button-gris-modal" },
        { text: "Si", handler: handleAccept, colorClass: "button-blue-modal" },
      ];
      break;
    case 1: // Submitting
      title = "Realizando entregas...";
      message =
        "Esperar mientras se envía la información a la base de datos...";
      buttons = [];
      break;
    case 2:
      title = "Confirmación";
      message = "Las entregas fueron realizadas con éxito!";
      buttons = [
        {
          text: "Aceptar",
          handler: closeModal,
          colorClass: "button-blue-modal",
        },
      ];
      break;
    default:
      break;
  }

  return (
    <IonPage>
      <CustomModal
        isOpen={showModal}
        title={title}
        message={message}
        buttons={buttons}
        onClose={closeModal}
        isSubmitting={modalStage === 1}
      />
      <IonContent className="ion-padding page-color">
        <div className="color-usuario w-100 text-white text-start ps-5  mt-5 mb-3">
          <span className="fw-bold"> Usuario Actual:</span> admin@admin.cl
        </div>
        <div className="container-fluid px-5 mt-4">
          <h2 className=" mb-3">Entregar EPP o Insumos</h2>
          <IonLabel className="text-dark" position="stacked">
            Cargo,Trabajadores e Insumos
          </IonLabel>
          <IonItem className="input-item mb-2">
            <IonSelect
              className="text-center"
              placeholder="[Seleccionar Cargo]"
            >
              <IonSelectOption value="cargo1">Cargo 1</IonSelectOption>
              <IonSelectOption value="cargo2">Cargo 2</IonSelectOption>
              <IonSelectOption value="cargo3">Cargo 3</IonSelectOption>
            </IonSelect>
          </IonItem>
          <div className="container-fluid ">
            <div className="row">
              <div className="col-6 px-0 pe-1 pe-md-2">
                <IonButton className="w-100  mx-0 mb-4 fw-bold button-blue">
                  Trabajadores
                </IonButton>
              </div>
              <div className="col-6 px-0 ps-1 ps-md-2">
                <IonButton className="w-100 mx-0 mb-4 fw-bold button-blue">
                  Insumos
                </IonButton>
              </div>
            </div>
          </div>
          <IonLabel className="text-dark" position="stacked">
            Motivo de entrega
          </IonLabel>
          <IonItem className="input-item mb-4">
            <IonInput
              type="text"
              clearInput
              placeholder="Motivo de entrega"
              className=""
            />
          </IonItem>
          <IonLabel className="text-dark" position="stacked">
            Bodega
          </IonLabel>
          <IonItem className="input-item mb-4">
            <IonSelect className="text-center" placeholder="[Bodega]">
              <IonSelectOption value="bodega1">Bodega 1</IonSelectOption>
              <IonSelectOption value="bodega2">Bodega 2</IonSelectOption>
              <IonSelectOption value="bodega3">Bodega 3</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonLabel className="text-dark" position="stacked">
            Resumen Trabajadores
          </IonLabel>
          <div className="container-fluid px-0 mt-1">
            <table className="table table-sm table-bordered table-custom text-center">
              <thead>
                <tr>
                  <th scope="col" className="th-custom">
                    RUT
                  </th>
                  <th scope="col" className="th-custom">
                    Nombre Completo
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12.345.678-9</td>
                  <td>Juan Alejandro Gomez Carreño</td>
                </tr>
                <tr>
                  <td>12.345.678-9</td>
                  <td>Juan Alejandro Gomez Carreño</td>
                </tr>
                <tr>
                  <td>12.345.678-9</td>
                  <td>Juan Alejandro Gomez Carreño</td>
                </tr>
                <tr>
                  <td>12.345.678-9</td>
                  <td>Juan Alejandro Gomez Carreño</td>
                </tr>
              </tbody>
            </table>
          </div>
          <IonLabel className="text-dark" position="stacked">
            Resumen EPP e Insumos
          </IonLabel>
          <div className="container-fluid px-0 my-1">
            <table className="table table-sm table-bordered table-custom text-center">
              <thead>
                <tr>
                  <th scope="col" className="th-custom">
                    Código
                  </th>
                  <th scope="col" className="th-custom">
                    EPP o Insumo
                  </th>
                  <th scope="col" className="th-custom">
                    Cantidad
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Guantes Cabritilla - M - Seproin</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Casco Minero - S - Caterpillar</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mascarilla KN45 - S - 3M</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <IonButton
            className="mx-0 mt-4 mb-3 fw-bold button-blue"
            expand="block"
            onClick={() => setShowModal(true)} // Esta línea hace que el modal se muestre
          >
            Validar y entregar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EppInsumos;
