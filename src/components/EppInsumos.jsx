import React, { useState, useEffect } from "react";
import { obtenerCargos } from "../services/cargos";
import { obtenerBodegas } from "../services/bodegas";
import SelectorTrabajadores from "./SelectorTrabajadores";
import TrabajadoresSeleccionados from "./TrabajadoresSeleccionados";
import SelectorInsumos from "./SelectorInsumos";
import InsumosSeleccionados from "./InsumosSeleccionados";
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
import UsuarioActual from "./UsuarioActual";
import { obtenerTrabajadoresPorCarId } from "../services/trabajadores";

const EppInsumos = () => {
  const [cargos, setCargos] = useState([]);
  const [bodegas, setBodegas] = useState([]);
  const [cargoSeleccionado, setCargoSeleccionado] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);
  const [insumosSeleccionados, setInsumosSeleccionados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalStage, setModalStage] = useState(0);
  const [motivo, setMotivo] = useState("");
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState("");
  
  

  useEffect(() => {
    const cargarCargos = async () => {
      try {
        const cargosObtenidos = await obtenerCargos();
        setCargos(cargosObtenidos);
      } catch (error) {
        console.error("No se pudieron cargar los cargos:", error);
      }
    };

    const cargarBodegas = async () => {
      try {
        const bodegasObtenidas = await obtenerBodegas();
        setBodegas(bodegasObtenidas);
      } catch (error) {
        console.error("No se pudieron cargar las bodegas:", error);
      }
    };

    cargarCargos();
    cargarBodegas();
  }, []);

  const onEliminar = (trabajadorId) => {
    const nuevosSeleccionados = seleccionados.filter(
      (trabajador) => trabajador.TRA_ID !== trabajadorId
    );
    setSeleccionados(nuevosSeleccionados);
    // Aquí también deberías actualizar cualquier otro estado o almacenamiento que esté usando estos datos
  };

  // En el componente padre
  const onEliminarInsumo = (insumoId) => {
    const nuevosInsumosSeleccionados = insumosSeleccionados.filter(
      (insumo) => insumo.EPP_ID !== insumoId
    );
    setInsumosSeleccionados(nuevosInsumosSeleccionados);
  };

  const onEditar = (insumoId, nuevaCantidad) => {
    const nuevosInsumosSeleccionados = insumosSeleccionados.map((insumo) =>
      insumo.EPP_ID === insumoId
        ? { ...insumo, cantidad: nuevaCantidad }
        : insumo
    );

    setInsumosSeleccionados(nuevosInsumosSeleccionados);
  };

  const closeModal = () => {
    setShowModal(false);

    if (modalStage === 2) {
      setSeleccionados([]);
      setInsumosSeleccionados([]);
      setBodegaSeleccionada("");
      setCargoSeleccionado("");
      setMotivo("");
    }

    setTimeout(() => {
      setModalStage(0);
    }, 300);
  };

  const handleAccept = () => {
    console.log({
      Cargo: cargos.find(cargo => cargo.CAR_ID === cargoSeleccionado)?.CAR_NOMBRE,
      TrabajadoresSeleccionados: seleccionados,
      InsumosSeleccionados: insumosSeleccionados,
      Motivo: motivo,
      Bodega: bodegas.find(bodega => bodega.BOD_ID === bodegaSeleccionada)?.BOD_NOMBRE,
  });
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
    <>
       <CustomModal
        isOpen={showModal}
        title={title}
        message={message}
        buttons={buttons}
        onClose={closeModal}
        isSubmitting={modalStage === 1}
      />
      <IonContent className=" page-color">
        <UsuarioActual usuario="admin@admin.cl" />
        <div className="container-fluid px-5 mt-4">
          <h2 className=" mb-3">Entregar EPP o Insumos</h2>
          <IonLabel className="text-dark" position="stacked">
            Cargo, Trabajadores e Insumos
          </IonLabel>
          <IonItem className="input-item mb-2">
            <IonSelect
              value={cargoSeleccionado}
              onIonChange={(e) => {
                setCargoSeleccionado(e.detail.value);
                setSeleccionados([]);
                setInsumosSeleccionados([]);
                setBodegaSeleccionada("");
                setMotivo("");
              }}
              placeholder="Seleccionar Cargo"
            >
              {cargos.map((cargo) => (
                <IonSelectOption key={cargo.CAR_ID} value={cargo.CAR_ID}>
                  {cargo.CAR_NOMBRE}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {cargoSeleccionado && (
            
            <>
               <div className="container-fluid">
              <div className="row">
                <div className="col-6 px-0 pe-1 pe-md-2">
                  <SelectorTrabajadores
                    seleccionados={seleccionados}
                    setSeleccionados={setSeleccionados}
                  />
                </div>
                <div className="col-6 px-0 ps-1 ps-md-2">
                  {seleccionados.length > 0 && (
                    <SelectorInsumos
                      insumosSeleccionados={insumosSeleccionados}
                      setInsumosSeleccionados={setInsumosSeleccionados}
                    />
                  )}
                </div>
              </div>
            </div>
              <IonLabel className="text-dark" position="stacked">
                Motivo de entrega
              </IonLabel>
              <IonItem className="input-item mb-4">
                <IonInput
                  type="text"
                  value={motivo}
                  onIonChange={(e) => setMotivo(e.detail.value)}
                  placeholder="Ingrese el motivo"
                />
              </IonItem>
              <IonLabel className="text-dark" position="stacked">
                Bodega
              </IonLabel>
              <IonItem className="input-item mb-4">
                <IonSelect
                  value={bodegaSeleccionada}
                  onIonChange={(e) => setBodegaSeleccionada(e.detail.value)}
                  placeholder="Seleccionar Bodega"
                >
                  {bodegas.map((bodega) => (
                    <IonSelectOption key={bodega.BOD_ID} value={bodega.BOD_ID}>
                      {bodega.BOD_NOMBRE}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <TrabajadoresSeleccionados
                seleccionados={seleccionados}
                onEliminar={(trabajadorId) => {
                  const nuevosSeleccionados = seleccionados.filter(
                    trabajador => trabajador.TRA_ID !== trabajadorId
                  );
                  setSeleccionados(nuevosSeleccionados);
                }}
              />
              {insumosSeleccionados.length > 0 && (
                        <InsumosSeleccionados
                        seleccionados={insumosSeleccionados}
                        onEliminar={onEliminarInsumo} // Asumiendo que también tienes esta función
                        onEditar={onEditar}
                      />
              )}
            </>
          )}
          <IonButton
            expand="block"
            onClick={() => setShowModal(true)}
            disabled={!bodegaSeleccionada || seleccionados.length === 0 || insumosSeleccionados.length === 0}
            className="mx-0 mt-4 mb-3 fw-bold button-blue"
          >
            Validar y entregar
          </IonButton>
        </div>
       
      </IonContent>
    </>
  );
};

export default EppInsumos;
