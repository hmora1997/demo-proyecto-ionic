import React, { useState, useEffect } from "react";
import { obtenerCargos } from "../services/cargos";
import { obtenerBodegas } from "../services/bodegas";
import SelectorTrabajadores from "./SelectorTrabajadores";
import TrabajadoresSeleccionados from "./TrabajadoresSeleccionados";
import SelectorInsumos from "./SelectorInsumos";
import InsumosSeleccionados from "./InsumosSeleccionados";
import {
  IonContent,
  IonLabel,
  IonItem,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import "./epp-insumos.css";
import CustomModal from "./CustomModal";
import UsuarioActual from "./UsuarioActual";
import { getDeviceInfo } from "../utils/androidId";
import { getCurrentLocation } from "../utils/geolocalizacion";
import { enviarSolicitudes } from "../services/insert";

const EppInsumos = () => {
  const [cargos, setCargos] = useState([]);
  const [bodegas, setBodegas] = useState([]);
  const [cargoSeleccionado, setCargoSeleccionado] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);
  const [insumosSeleccionados, setInsumosSeleccionados] = useState([]);
  const [firmas, setFirmas] = useState({});
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
    // Eliminar firma del objeto firmas
    const nuevasFirmas = { ...firmas };
    delete nuevasFirmas[trabajadorId];
    console.log('Firma eliminada:', nuevasFirmas);

    // Eliminar trabajador de seleccionados
    const nuevosSeleccionados = seleccionados.filter(
      (trabajador) => trabajador.tra_id !== trabajadorId
    );
    setSeleccionados(nuevosSeleccionados);
    setFirmas(nuevasFirmas);
  };

  const onEliminarInsumo = (insumoId) => {
    const nuevosInsumosSeleccionados = insumosSeleccionados.filter(
      (insumo) => insumo.epp_id !== insumoId
    );
    setInsumosSeleccionados(nuevosInsumosSeleccionados);
  };

  const onEditar = (insumoId, nuevaCantidad) => {
    const nuevosInsumosSeleccionados = insumosSeleccionados.map((insumo) =>
      insumo.epp_id === insumoId
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
      setFirmas({});
      setBodegaSeleccionada("");
      setCargoSeleccionado("");
      setMotivo("");
    }

    setTimeout(() => {
      setModalStage(0);
    }, 300);
  };

  const handleAccept = async () => {
    setModalStage(1);
    setShowModal(true);

    let location, uuid;

    try {
      location = await getCurrentLocation();
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
      location = { coords: { latitude: "", longitude: "" } };
    }

    try {
      const deviceInfo = await getDeviceInfo();
      uuid = deviceInfo.uuid || "";
    } catch (error) {
      console.error("Error al obtener el Android UUID:", error);
      uuid = "";
    }

    try {
      await enviarSolicitudes(
        seleccionados,
        insumosSeleccionados,
        motivo,
        bodegaSeleccionada,
        1,
        uuid,
        location,
        firmas
      );

      setTimeout(() => {
        setModalStage(2);
        setTimeout(() => {
          setShowModal(false);
          setModalStage(0);
        }, 3000);
      }, 2000);
    } catch (error) {
      console.error("Error al enviar las solicitudes:", error);
      setModalStage(3);
    }
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
    case 1:
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
    case 3:
      title = "Error";
      message =
        "Hubo un problema al procesar su solicitud. Por favor, intente de nuevo más tarde.";
      buttons = [
        {
          text: "Cerrar",
          handler: closeModal,
          colorClass: "button-red-modal",
        },
      ];
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
      <IonContent className="page-color">
        <UsuarioActual usuario="admin@admin.cl" />
        <div className="container-fluid px-4 mt-4">
          <h2 className="mb-3">Entregar EPP o Insumos</h2>
          <IonLabel className="text-dark" position="stacked">
            <strong>Paso 1: Seleccione cargo</strong>
          </IonLabel>
          <IonItem className="input-item mb-2">
            <IonSelect
              value={cargoSeleccionado}
              onIonChange={(e) => {
                setCargoSeleccionado(e.detail.value);
                setSeleccionados([]);
                setInsumosSeleccionados([]);
                setFirmas({});
                setBodegaSeleccionada("");
                setMotivo("");
              }}
              placeholder="Seleccionar Cargo"
            >
              {cargos.map((cargo) => (
                <IonSelectOption key={cargo.car_id} value={cargo.car_id}>
                  {cargo.car_nombre}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {cargoSeleccionado && (
            <>
              <strong>Paso 2: Agregar Trabajador</strong>
              <div className="container-fluid px-0 pe-md-2">
                <SelectorTrabajadores
                  cargoSeleccionado={cargoSeleccionado}
                  seleccionados={seleccionados}
                  setSeleccionados={setSeleccionados}
                />
              </div>
              <IonLabel className="text-dark" position="stacked">
                Resumen Trabajadores
                <p className="fw-bold text-dark">
                  Presione un trabajador para firmar o eliminar
                </p>
              </IonLabel>
              <TrabajadoresSeleccionados
                seleccionados={seleccionados}
                setSeleccionados={setSeleccionados}
                onEliminar={onEliminar}
                firmas={firmas}
                setFirmas={setFirmas}
              />
            </>
          )}
          {cargoSeleccionado && seleccionados.length > 0 && (
            <>
              <strong>Paso 3: Agregar Insumos</strong>
              <div className="container-fluid px-0 pe-md-2">
                <SelectorInsumos
                  cargoSeleccionado={cargoSeleccionado}
                  insumosSeleccionados={insumosSeleccionados}
                  setInsumosSeleccionados={setInsumosSeleccionados}
                />
              </div>
              <IonLabel className="text-dark" position="stacked">
                Resumen Insumos
                <p className="fw-bold text-dark">
                  Presione un insumo para eliminar
                </p>
              </IonLabel>
              <InsumosSeleccionados
                seleccionados={insumosSeleccionados}
                onEliminar={onEliminarInsumo}
                onEditar={onEditar}
              />
            </>
          )}
          {insumosSeleccionados.length > 0 && (
            <>
              <IonLabel className="text-dark" position="stacked">
                Paso 4: Motivo de entrega
              </IonLabel>
              <IonItem className="input-item mb-4">
                <IonSelect
                  value={motivo}
                  onIonChange={(e) => setMotivo(e.detail.value)}
                  placeholder="Seleccione el motivo"
                >
                  <IonSelectOption value="PRIMERA ENTREGA">
                    PRIMERA ENTREGA
                  </IonSelectOption>
                  <IonSelectOption value="EXTRAVÍO">EXTRAVÍO</IonSelectOption>
                  <IonSelectOption value="AVERÍA">AVERÍA</IonSelectOption>
                  <IonSelectOption value="VENCIMIENTO">
                    VENCIMIENTO
                  </IonSelectOption>
                  <IonSelectOption value="OTROS MOTIVOS">
                    OTROS MOTIVOS
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonLabel className="text-dark" position="stacked">
                Paso 5: Bodega
              </IonLabel>
              <IonItem className="input-item mb-4">
                <IonSelect
                  value={bodegaSeleccionada}
                  onIonChange={(e) => setBodegaSeleccionada(e.detail.value)}
                  placeholder="Seleccionar Bodega"
                >
                  {bodegas.map((bodega) => (
                    <IonSelectOption key={bodega.bod_id} value={bodega.bod_id}>
                      {bodega.bod_nombre}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </>
          )}
          {seleccionados.length > 0 &&
            insumosSeleccionados.length > 0 &&
            bodegaSeleccionada.length > 0 &&
            motivo.trim() !== "" && (
              <IonButton
                expand="block"
                onClick={() => {
                  setShowModal(true);
                  setModalStage(0);
                }}
                className="mx-0 mt-4 mb-3 fw-bold button-blue"
              >
                Validar y entregar
              </IonButton>
            )}
        </div>
      </IonContent>
    </>
  );
};

export default EppInsumos;
