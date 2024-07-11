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
  IonSearchbar,
} from "@ionic/react";
import { close, add, remove } from "ionicons/icons";
import { obtenerInsumosPorCarId } from "../../services/insumos";

const SelectorInsumos = ({
  cargoSeleccionado,
  insumosSeleccionados,
  setInsumosSeleccionados,
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [seleccionados, setSeleccionados] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const cargarInsumos = async () => {
      setIsLoading(true);
      try {
        const insumosObtenidos = await obtenerInsumosPorCarId(cargoSeleccionado);
        console.log("OBTENIDOS ", insumosObtenidos)
        const insumosFiltrados = insumosObtenidos.filter(
          (insumo) => insumo.car_id === cargoSeleccionado
        );
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
      setInsumos([]);
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

  const handleSearch = (ev) => {
    const query = ev.target.value.toLowerCase();
    setSearchText(query);
  };

  const insumosFiltrados = insumos.filter((insumo) =>
    insumo.epp_nombre.toLowerCase().includes(searchText)
  );

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
        <IonHeader className="d-flex justify-content-between align-items-center px-2">
          <h5 className="ms-1 mt-0 mb-0 me-0">Selecciona Insumos </h5>
          <IonButton
            className="fw-bold button-blue"
            fill="clear"
            onClick={() => setMostrarModal(false)}
          >
            <IonIcon icon={close} />
          </IonButton>
        </IonHeader>
        <div className="container-fluid mb-2">
          <IonSearchbar
            value={searchText}
            animated={true}
            onIonInput={handleSearch}
            debounce={300}
            placeholder="Buscar por nombre de insumo"
            className="px-0 mx-0"
          />
        </div>
        <IonLoading isOpen={isLoading} message="Cargando insumos..." />
        <IonContent>
          {insumosFiltrados.length === 0 ? (
            <div className="text-center mt-3">
              <p>No se encontraron resultados.</p>
            </div>
          ) : (
            <div className="list-group">
              {insumosFiltrados.map((insumo) => (
                <label
                  key={insumo.epp_id}
                  className="list-group-item d-flex position-relative align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    value=""
                    checked={!!seleccionados[insumo.epp_id]}
                    onChange={() => toggleSeleccion(insumo.epp_id)}
                  />
                  <div className="ms-3 w-100 d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1">
                      <div>
                        <span className="fw-bold">{insumo.epp_nombre} -</span>
                      </div>
                      <div>
                        Talla: <span className="fw-bold">{insumo.epp_talla}</span>
                      </div>
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
          )}
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
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
      />
    </>
  );
};

export default SelectorInsumos;
