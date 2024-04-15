import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonModal,
  IonFooter,
  IonHeader,
  IonIcon,
  IonContent,
  IonLoading,
  IonToast,
  IonInput,
  IonCheckbox,
} from "@ionic/react";
import { close, add, remove } from "ionicons/icons";
import { obtenerInsumos } from "../services/insumos";

const SelectorInsumos = ({ insumosSeleccionados, setInsumosSeleccionados }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [seleccionados, setSeleccionados] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const cargarInsumos = async () => {
      setIsLoading(true);
      try {
        const insumosObtenidos = await obtenerInsumos();
        setInsumos(insumosObtenidos);
        setIsLoading(false);
      } catch (error) {
        console.error("No se pudieron cargar los insumos:", error);
        setToastMessage("Error al cargar insumos. Intente de nuevo.");
        setShowToast(true);
        setIsLoading(false);
      }
    };

    cargarInsumos();
  }, []);

  useEffect(() => {
    const seleccionadosActualizados = insumosSeleccionados.reduce(
      (acc, insumo) => {
        acc[insumo.EPP_ID] = { ...insumo };
        return acc;
      },
      {}
    );
    setSeleccionados(seleccionadosActualizados);
  }, [insumosSeleccionados]);

  const toggleSeleccion = (insumoId) => {
    const nuevoEstado = { ...seleccionados };
    if (nuevoEstado[insumoId]) {
      delete nuevoEstado[insumoId];
    } else {
      const insumoSeleccionado = insumos.find(
        (insumo) => insumo.EPP_ID === insumoId
      );
      nuevoEstado[insumoId] = { ...insumoSeleccionado, cantidad: 1 };
    }
    setSeleccionados(nuevoEstado);
  };

  const cambiarCantidad = (insumoId, incremento) => {
    setSeleccionados(prev => ({
      ...prev,
      [insumoId]: {
        ...prev[insumoId],
        cantidad: Math.max(1, (prev[insumoId].cantidad || 0) + incremento)
      }
    }));
  };

  const confirmarSeleccion = () => {
    const insumosConCantidad = Object.values(seleccionados).filter(
      (insumo) => insumo.cantidad > 0
    );
    setInsumosSeleccionados(insumosConCantidad);
    setMostrarModal(false);
  };

  return (
    <>
      <IonButton
        onClick={() => setMostrarModal(true)}
        className="w-100 mx-0 mb-4 fw-bold button-blue"
      >
        Insumos
      </IonButton>
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
        <IonLoading isOpen={isLoading} message="Cargando insumos..." />
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
        <IonContent>
          <div className="list-group">
            {insumos.map((insumo) => (
              <label
                key={insumo.EPP_ID}
                className="list-group-item d-flex position-relative align-items-center"
                style={{ cursor: "pointer" }}
              >
                <IonCheckbox
                  checked={!!seleccionados[insumo.EPP_ID]}
                  onIonChange={() => toggleSeleccion(insumo.EPP_ID)}
                  className="form-check-input me-1"
                />
                <div className="ms-3 w-100 d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <strong>{insumo.EPP_NOMBRE} - {insumo.EPP_DESCRIPCION}</strong>
                  </div>
                  {seleccionados[insumo.EPP_ID] && (
                    <div className="d-flex align-items-center">
                      <IonButton fill="clear" onClick={() => cambiarCantidad(insumo.EPP_ID, -1)}>
                        <IonIcon icon={remove} />
                      </IonButton>
                      <IonInput
                        type="number"
                        value={seleccionados[insumo.EPP_ID].cantidad.toString()}
                        className="mx-2"
                        style={{ width: '60px', textAlign: 'center' }}
                      />
                      <IonButton fill="clear" onClick={() => cambiarCantidad(insumo.EPP_ID, 1)}>
                        <IonIcon icon={add} />
                      </IonButton>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </IonContent>
        <IonFooter>
          <IonButton
            expand="block"
            onClick={confirmarSeleccion}
            className="w-100 mx-0 mb-0 fw-bold button-blue"
          >
            Confirmar Selección
          </IonButton>
        </IonFooter>
      </IonModal>
    </>
  );
};

export default SelectorInsumos;
