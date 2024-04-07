import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonInput,
  IonFooter,
} from "@ionic/react";
import { obtenerInsumos } from "../services/insumos";

const SelectorInsumos = ({ insumosSeleccionados, setInsumosSeleccionados }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [seleccionados, setSeleccionados] = useState({});

  useEffect(() => {
    const cargarInsumos = async () => {
      try {
        const insumosObtenidos = await obtenerInsumos();
        setInsumos(insumosObtenidos);
      } catch (error) {
        console.error("No se pudieron cargar los insumos:", error);
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

  const actualizarCantidad = (e, insumoId) => {
    const nuevaCantidad = e.detail.value;
    setSeleccionados((prev) => ({
      ...prev,
      [insumoId]: { ...prev[insumoId], cantidad: Number(nuevaCantidad) || 1 },
    }));
  };

  const confirmarSeleccion = () => {
    // Filtra y establece solo los insumos que están seleccionados y tienen una cantidad mayor a 0
    const insumosConCantidad = Object.values(seleccionados).filter(
      (insumo) => insumo.cantidad > 0
    );
    setInsumosSeleccionados(insumosConCantidad);

    // Ahora, limpia 'seleccionados' para quitar aquellos con cantidad 0
    const seleccionadosActualizados = Object.fromEntries(
      Object.entries(seleccionados).filter(([_, insumo]) => insumo.cantidad > 0)
    );

    setSeleccionados(seleccionadosActualizados);

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
        <IonContent>
          <IonList className="p-1">
            {insumos.map((insumo) => (
              <IonItem
                key={insumo.EPP_ID}
                className="d-flex align-items-center"
              >
                <IonCheckbox
                  checked={!!seleccionados[insumo.EPP_ID]}
                  onIonChange={() => toggleSeleccion(insumo.EPP_ID)}
                  className="me-2"
                />
                {seleccionados[insumo.EPP_ID] ? (
                  <>
                    <IonLabel className="flex-grow-1">
                      {insumo.EPP_NOMBRE} - {insumo.EPP_DESCRIPCION}
                    </IonLabel>
                    <IonInput
                      type="number"
                      value={seleccionados[insumo.EPP_ID].cantidad.toString()}
                      onIonChange={(e) => actualizarCantidad(e, insumo.EPP_ID)}
                      placeholder="Cantidad"
                      className="w-auto ms-2"
                    />
                  </>
                ) : (
                  <IonLabel className="flex-grow-1">
                    {insumo.EPP_NOMBRE} - {insumo.EPP_DESCRIPCION}
                  </IonLabel>
                )}
              </IonItem>
            ))}
          </IonList>
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
