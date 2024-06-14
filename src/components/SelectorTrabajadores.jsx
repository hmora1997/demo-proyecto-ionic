// SelectorTrabajadores.js
import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonModal,
  IonFooter,
  IonHeader,
  IonIcon,
  IonContent,
} from '@ionic/react';
import { obtenerTrabajadoresPorCarId } from '../services/trabajadores'; // Asegúrate de tener esta importación
import { close } from 'ionicons/icons';

const SelectorTrabajadores = ({ cargoSeleccionado, seleccionados, setSeleccionados }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [trabajadores, setTrabajadores] = useState([]);
  const [temporalSeleccionados, setTemporalSeleccionados] = useState([]);

  useEffect(() => {
    const cargarTrabajadores = async () => {
      if (cargoSeleccionado) {
        try {
          const trabajadoresObtenidos = await obtenerTrabajadoresPorCarId(cargoSeleccionado);
          setTrabajadores(trabajadoresObtenidos);
        } catch (error) {
          console.error("No se pudieron cargar los trabajadores:", error);
        }
      }
    };

    cargarTrabajadores();
  }, [cargoSeleccionado]);

  useEffect(() => {
    setTemporalSeleccionados(seleccionados);
  }, [mostrarModal]);

  const toggleSeleccion = (trabajador) => {
    const estaSeleccionado = temporalSeleccionados.some(
      (selec) => selec.tra_id === trabajador.tra_id
    );
    if (estaSeleccionado) {
      setTemporalSeleccionados(
        temporalSeleccionados.filter((selec) => selec.tra_id !== trabajador.tra_id)
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
      <IonButton onClick={() => setMostrarModal(true)} className="w-100 mx-0 mb-4 fw-bold button-blue">Seleccionar Trabajadores</IonButton>

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
                    (selec) => selec.tra_id === trabajador.tra_id
                  )}
                  onChange={() => toggleSeleccion(trabajador)}
                />
                <div className="ms-3 w-100">
                  <strong>
                    {trabajador.tra_apellidos_nombre}
                  </strong>
                  <div>{trabajador.tra_rut_completo}</div>
                  <div>{trabajador.car_nombre || "Cargo no especificado"}</div>
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
