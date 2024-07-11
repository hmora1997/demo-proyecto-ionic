import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonModal,
  IonFooter,
  IonHeader,
  IonIcon,
  IonContent,
  IonSearchbar,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { obtenerCapacitacionesPorCarId } from "../../services/capacitaciones";

const SelectorCapacitaciones = ({
  cargoSeleccionado,
  capacitacionesSeleccionadas,
  setCapacitacionesSeleccionadas,
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [temporalSeleccionados, setTemporalSeleccionados] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const cargarCapacitaciones = async () => {
      if (cargoSeleccionado) {
        setIsLoading(true);
        try {
          const capacitacionesObtenidas = await obtenerCapacitacionesPorCarId(cargoSeleccionado);
          setCapacitaciones(capacitacionesObtenidas);
        } catch (error) {
          console.error("No se pudieron cargar las capacitaciones:", error);
          setToastMessage("Error al cargar capacitaciones. Intente de nuevo.");
          setShowToast(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    cargarCapacitaciones();
  }, [cargoSeleccionado]);

  useEffect(() => {
    setTemporalSeleccionados(capacitacionesSeleccionadas);
  }, [mostrarModal, capacitacionesSeleccionadas]);

  const toggleSeleccion = (capacitacion) => {
    const estaSeleccionado = temporalSeleccionados.some(
      (selec) => selec.cap_id === capacitacion.cap_id
    );
    if (estaSeleccionado) {
      setTemporalSeleccionados(
        temporalSeleccionados.filter((selec) => selec.cap_id !== capacitacion.cap_id)
      );
    } else {
      setTemporalSeleccionados([...temporalSeleccionados, capacitacion]);
    }
  };

  const confirmarSeleccion = () => {
    setCapacitacionesSeleccionadas(temporalSeleccionados);
    setMostrarModal(false);
  };

  const handleSearch = (ev) => {
    const query = ev.target.value.toLowerCase();
    setSearchText(query);
  };

  const capacitacionesFiltradas = capacitaciones.filter((capacitacion) =>
    capacitacion.cap_nombre.toLowerCase().includes(searchText)
  );

  return (
    <>
      <IonButton onClick={() => setMostrarModal(true)} className="w-100 mx-0 mb-4 fw-bold button-blue">
        Seleccionar Capacitaciones
      </IonButton>
      <IonModal
        isOpen={mostrarModal}
        onDidDismiss={() => setMostrarModal(false)}
      >
        <IonHeader className="d-flex justify-content-between align-items-center px-2">
          <h5 className="ms-1 mt-0 mb-0 me-0">Selecciona Capacitación</h5>
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
            placeholder="Buscar por nombre de capacitación"
            className="px-0 mx-0"
          />
        </div>
        <IonLoading isOpen={isLoading} message="Cargando capacitaciones..." />
        <IonContent>
          {capacitacionesFiltradas.length === 0 ? (
            <div className="text-center mt-3">
              <p>No se encontraron resultados.</p>
            </div>
          ) : (
            <div className="list-group">
              {capacitacionesFiltradas.map((capacitacion) => (
                <label
                  key={capacitacion.cap_id}
                  className="list-group-item d-flex position-relative align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    value=""
                    checked={temporalSeleccionados.some(
                      (selec) => selec.cap_id === capacitacion.cap_id
                    )}
                    onChange={() => toggleSeleccion(capacitacion)}
                  />
                  <div className="ms-3 w-100">
                    <strong>{capacitacion.cap_nombre}</strong>
                    <div>{capacitacion.cap_descripcion}</div>
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
            className="mx-0 mb-0 fw-bold button-blue"
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

export default SelectorCapacitaciones;
