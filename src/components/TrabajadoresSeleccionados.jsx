import React, { useState } from "react";
import { IonPopover, IonButton, IonIcon, IonList } from "@ionic/react";
import { trash } from "ionicons/icons";

const TrabajadoresSeleccionados = ({ seleccionados, onEliminar }) => {
  const [showPopover, setShowPopover] = useState({ open: false, event: null });
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);

  return (
    <div className="container-fluid px-0 mt-1">
      <table className="table table-sm table-bordered table-custom text-center">
        <thead>
          <tr>
            <th scope="col" className="th-custom">
              RUT
            </th>
            <th scope="col" className="th-custom">
              Nombre Completo
            </th>
          </tr>
        </thead>
        <tbody>
          {seleccionados.length > 0 ? (
            seleccionados.map((trabajador) => (
              <tr
                key={trabajador.TRA_ID}
                onClick={(e) => {
                  setShowPopover({ open: true, event: e.nativeEvent });
                  setTrabajadorSeleccionado(trabajador.TRA_ID);
                }}
              >
                <td>{trabajador.TRA_RUT}</td>
                <td>{`${trabajador.TRA_NOMBRES} ${trabajador.TRA_APELLIDOS}`}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay Trabajadores seleccionados.</td>
            </tr>
          )}
        </tbody>
      </table>
      <IonPopover
        isOpen={showPopover.open}
        event={showPopover.event}
        onDidDismiss={() => setShowPopover({ open: false, event: null })}
      >
        <IonList className="d-flex justify-content-center p-1">
          <IonButton
            className="w-50 m-0  mb-0 fw-bold button-red"
            onClick={() => {
              onEliminar(trabajadorSeleccionado);
              setShowPopover({ open: false, event: null });
            }}
          >
            Eliminar
          </IonButton>
        </IonList>
      </IonPopover>
    </div>
  );
};

export default TrabajadoresSeleccionados;
