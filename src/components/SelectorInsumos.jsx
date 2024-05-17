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
import { obtenerInsumosPorCarId } from "../services/insumos";

const SelectorInsumos = ({
  cargoSeleccionado,
  insumosSeleccionados,
  setInsumosSeleccionados,
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [seleccionados, setSeleccionados] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = "";

  useEffect(() => {
    const cargarInsumos = async () => {
      setIsLoading(true);
      try {
        const insumosObtenidos = await obtenerInsumosPorCarId(
          cargoSeleccionado
        );
        // console.log("Insumos Obtenidos",insumosObtenidos);
        const insumosFiltrados = insumosObtenidos.filter(
          (insumo) => insumo.car_id === cargoSeleccionado
        );
        // console.log(
        //   "Insumos filtrados para el cargo ID",
        //   cargoSeleccionado,
        //   insumosFiltrados
        // );
        setInsumos(insumosFiltrados);
        setIsLoading(false);
      } catch (error) {
        console.error("No se pudieron cargar los insumos:", error);
        setToastMessage("Error al cargar insumos. Intente de nuevo.");
        setShowToast(true);
        setIsLoading(false);
      }
    };

    if (cargoSeleccionado) {
      cargarInsumos();
    } else {
      setInsumos([]); // Limpia los insumos si no hay cargo seleccionado
    }
  }, [cargoSeleccionado]);

  useEffect(() => {
    const seleccionadosActualizados = insumosSeleccionados.reduce(
      (acc, insumo) => {
        acc[insumo.epp_id] = { ...insumo };
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
        (insumo) => insumo.epp_id === insumoId
      );
      nuevoEstado[insumoId] = { ...insumoSeleccionado, cantidad: 1 };
    }
    setSeleccionados(nuevoEstado);
  };

  const cambiarCantidad = (insumoId, incremento) => {
    setSeleccionados((prev) => ({
      ...prev,
      [insumoId]: {
        ...prev[insumoId],
        cantidad: Math.max(1, (prev[insumoId].cantidad || 0) + incremento),
      },
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
        Seleccionar Insumos
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

        <IonContent>
          <div className="list-group">
            {insumos.map((insumo) => (
              <label
                key={insumo.epp_id}
                className="list-group-item d-flex position-relative align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => toggleSeleccion(insumo.epp_id)} // Se añade el onClick aquí
              >
                <IonCheckbox
                  checked={!!seleccionados[insumo.epp_id]}
                  onIonChange={() => toggleSeleccion(insumo.epp_id)}
                  className="form-check-input me-1"
                />
                <div className="ms-3 w-100 d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <strong>
                      {insumo.epp_nombre} - {insumo.epp_descripcion}
                    </strong>
                  </div>
                  {seleccionados[insumo.epp_id] && (
                    <div className="d-flex align-items-center">
                      <IonButton
                        fill="clear"
                        onClick={(e) => {
                          e.stopPropagation();
                          cambiarCantidad(insumo.epp_id, -1);
                        }}
                      >
                        <IonIcon icon={remove} />
                      </IonButton>
                      <IonInput
                        type="number"
                        value={seleccionados[insumo.epp_id].cantidad.toString()}
                        className="mx-2"
                        style={{ width: "60px", textAlign: "center" }}
                      />
                      <IonButton
                        fill="clear"
                        onClick={(e) => {
                          e.stopPropagation();
                          cambiarCantidad(insumo.epp_id, 1);
                        }}
                      >
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
