import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
} from "@ionic/react";
import { obtenerTrabajadores } from "../services/trabajadores";

const SelectorTrabajadores = ({ seleccionados, setSeleccionados }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [trabajadores, setTrabajadores] = useState([]);

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

  const toggleSeleccion = (trabajador) => {
    const estaSeleccionado = seleccionados.some(selec => selec.TRA_ID === trabajador.TRA_ID);
    if (estaSeleccionado) {
      setSeleccionados(seleccionados.filter(selec => selec.TRA_ID !== trabajador.TRA_ID));
    } else {
      setSeleccionados([...seleccionados, trabajador]);
    }
  };

  const confirmarSeleccion = () => {
    // Cierra el modal, no es necesario actualizar el estado aquí ya que se hace en toggleSeleccion
    setMostrarModal(false);
  };

  return (
    <>
      <IonButton className="w-100 mx-0 mb-4 fw-bold button-blue" onClick={() => setMostrarModal(true)}>
        Trabajadores
      </IonButton>

      <IonModal isOpen={mostrarModal} onDidDismiss={() => setMostrarModal(false)}>
        <IonList className="p-1">
          {trabajadores.map(trabajador => (
            <IonItem key={trabajador.TRA_ID}>
              <IonLabel>
                {trabajador.TRA_RUT} - {trabajador.TRA_NOMBRES} {trabajador.TRA_APELLIDOS} - {trabajador.TRA_CARGO || "Cargo no especificado"}
              </IonLabel>
              <IonCheckbox
                slot="start"
                checked={seleccionados.some(selec => selec.TRA_ID === trabajador.TRA_ID)}
                onIonChange={() => toggleSeleccion(trabajador)}
              />
            </IonItem>
          ))}
        </IonList>
        <IonButton onClick={confirmarSeleccion} className="w-100 mx-0 mb-0 fw-bold button-blue">
          Confirmar Selección
        </IonButton>
      </IonModal>
    </>
  );
};

export default SelectorTrabajadores;
