import React, { useState } from "react";
import { IonPopover, IonButton, IonList, IonInput } from "@ionic/react";

const InsumosSeleccionados = ({ seleccionados, onEliminar, onEditar }) => {
  const [showPopover, setShowPopover] = useState({
    open: false,
    event: null,
    insumoId: null,
  });

  // Función para mostrar el popover de edición
  const mostrarPopover = (e, insumoId) => {
    e.preventDefault();
    setShowPopover({ open: true, event: e.nativeEvent, insumoId });
  };

  // Cierra el popover
  const cerrarPopover = () =>
    setShowPopover({ open: false, event: null, insumoId: null });

  return (
    <div className="container-fluid px-0 mt-1">
      <table className="table table-sm table-bordered table-custom text-center">
        <thead>
          <tr>
            <th scope="col" className="th-custom">
              Código
            </th>
            <th scope="col" className="th-custom">
              EPP o Insumo
            </th>
            <th scope="col" className="th-custom">
              Cantidad
            </th>
          </tr>
        </thead>
        <tbody>
          {seleccionados.length > 0 ? (
            seleccionados.map((insumo) => (
              <tr
                key={insumo.EPP_ID}
                onClick={(e) => mostrarPopover(e, insumo.EPP_ID)}
              >
                <td>{insumo.EPP_ID}</td>
                <td>{`${insumo.EPP_NOMBRE} - ${insumo.EPP_TALLA} - ${insumo.EPP_MARCA}`}</td>
                <td>{insumo.cantidad}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay Insumos seleccionados.</td>
            </tr>
          )}
        </tbody>
      </table>
      <IonPopover
        isOpen={showPopover.open}
        event={showPopover.event}
        onDidDismiss={cerrarPopover}
        cssClass="my-custom-class" // Use esta clase para estilos personalizados si es necesario
      >
        <IonList className="d-flex flex-column justify-content-center p-1">
          <IonInput
            type="number"
            placeholder="Nueva cantidad"
            onIonChange={(e) =>
              onEditar(showPopover.insumoId, parseInt(e.detail.value, 10))
            }
          />
          <IonButton
            className="w-100 m-0  mb-0 fw-bold button-red"
            expand="block"
            onClick={cerrarPopover}
          >
            Confirmar
          </IonButton>
        </IonList>
      </IonPopover>
    </div>
  );
};

export default InsumosSeleccionados;
