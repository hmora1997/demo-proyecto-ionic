import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonContent,
  IonSearchbar,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import { obtenerCargosCapacitaciones } from '../../services/cargos';

const SelectorCargos = ({ seleccionados, setSeleccionados, onClose }) => {
  const [cargos, setCargos] = useState([]);
  const [temporalSeleccionados, setTemporalSeleccionados] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const cargarCargos = async () => {
      try {
        const cargosObtenidos = await obtenerCargosCapacitaciones();
        setCargos(cargosObtenidos);
      } catch (error) {
        console.error("No se pudieron cargar los cargos:", error);
      }
    };

    cargarCargos();
  }, []);

  useEffect(() => {
    setTemporalSeleccionados(seleccionados);
  }, [seleccionados]);

  const toggleSeleccion = (cargo) => {
    if (temporalSeleccionados.some((selec) => selec.car_id === cargo.car_id)) {
      setTemporalSeleccionados([]);
    } else {
      setTemporalSeleccionados([cargo]);
    }
  };

  const confirmarSeleccion = () => {
    setSeleccionados(temporalSeleccionados);
    onClose();
  };

  const handleSearch = (ev) => {
    const query = ev.target.value.toLowerCase();
    setSearchText(query);
  };

  const cargosFiltrados = cargos.filter((cargo) =>
    cargo.car_nombre.toLowerCase().includes(searchText)
  );

  return (
    <>
      <IonHeader className="d-flex justify-content-between align-items-center px-2">
        <h5 className="ms-1 mt-0 mb-0 me-0">Selecciona un cargo</h5>
        <IonButton
          className="fw-bold button-blue"
          fill="clear"
          onClick={onClose}
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
          placeholder="Buscar por nombre de cargo"
          className="px-0 mx-0"
        />
      </div>
      <IonContent>
        {cargosFiltrados.length === 0 ? (
          <div className="text-center mt-3">
            <p>No se encontraron resultados.</p>
          </div>
        ) : (
          <div className="list-group">
            {cargosFiltrados.map((cargo, index) => (
              <div
                key={index}
                className="list-group-item d-flex position-relative align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => toggleSeleccion(cargo)}
              >
                <input
                  className="form-check-input me-1"
                  type="radio"
                  value=""
                  checked={temporalSeleccionados.some(
                    (selec) => selec.car_id === cargo.car_id
                  )}
                  readOnly
                />
                <div className="ms-3 w-100">
                  <strong>{cargo.car_nombre}</strong>
                </div>
              </div>
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
    </>
  );
};

export default SelectorCargos;
