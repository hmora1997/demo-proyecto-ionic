import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonModal,
  IonFooter,
  IonHeader,
  IonIcon,
  IonContent,
} from "@ionic/react";
import { obtenerTrabajadores } from "../services/trabajadores";
import { close } from "ionicons/icons";

const SelectorTrabajadores = ({ seleccionados, setSeleccionados }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [trabajadores, setTrabajadores] = useState([]);
  const [temporalSeleccionados, setTemporalSeleccionados] = useState([]);

  useEffect(() => {
    const cargarTrabajadores = async () => {
      try {
        const trabajadoresObtenidos = await obtenerTrabajadores();
        setTrabajadores(trabajadoresObtenidos);
      } catch (error) {
        console.error("No se pudieron cargar los trabajadores:", error);
      }
    };

    cargarTrabajadores();
  }, []);

  useEffect(() => {
    setTemporalSeleccionados(seleccionados);
  }, [mostrarModal]);

  const toggleSeleccion = (trabajador) => {
    const estaSeleccionado = temporalSeleccionados.some(
      (selec) => selec.TRA_ID === trabajador.TRA_ID
    );
    if (estaSeleccionado) {
      setTemporalSeleccionados(
        temporalSeleccionados.filter((selec) => selec.TRA_ID !== trabajador.TRA_ID)
      );
    } else {
      setTemporalSeleccionados([...temporalSeleccionados, trabajador]);
    }
  };

  const confirmarSeleccion = () => {
    setSeleccionados(temporalSeleccionados);
    setMostrarModal(false);
  };

  return (
    <>
      <IonButton onClick={() => setMostrarModal(true)} className="w-100 mx-0 mb-4 fw-bold button-blue">Trabajadores</IonButton>

      <IonModal
        isOpen={mostrarModal}
        onDidDismiss={() => setMostrarModal(false)}
      >
        <IonHeader className="d-flex justify-content-end align-items-center">
        <IonButton
            className="fw-bold button-blue"
            fill="clear"
            onClick={() => setMostrarModal(false)}
          >
            <IonIcon icon={close} />
          </IonButton>
        </IonHeader>
        <IonContent>
          <div className="list-group">
            {trabajadores.map((trabajador, index) => (
              <label
                key={index}
                className="list-group-item d-flex position-relative align-items-center"
                style={{ cursor: "pointer" }}
              >
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  value=""
                  checked={temporalSeleccionados.some(
                    (selec) => selec.TRA_ID === trabajador.TRA_ID
                  )}
                  onChange={() => toggleSeleccion(trabajador)}
                />
                <div className="ms-3 w-100">
                  <strong>
                    {trabajador.TRA_NOMBRES} {trabajador.TRA_APELLIDOS}
                  </strong>
                  <div>{trabajador.TRA_RUT_COMPLETO}</div>
                  <div>{trabajador.TRA_CARGO || "Cargo no especificado"}</div>
                </div>
              </label>
            ))}
          </div>
        </IonContent>
        <IonFooter>
          <IonButton
            expand="block"
            onClick={confirmarSeleccion}
            className="mx-0 mb-0 fw-bold button-blue"
          >
            Confirmar Selección
          </IonButton>
        </IonFooter>
      </IonModal>
    </>
  );
};

export default SelectorTrabajadores;
