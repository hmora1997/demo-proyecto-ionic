import React, { useState } from "react";
import { IonActionSheet } from "@ionic/react";
import { trash,close } from "ionicons/icons";

const TrabajadoresSeleccionados = ({ seleccionados, onEliminar }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
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
                onClick={() => {
                  setTrabajadorSeleccionado(trabajador);
                  setShowActionSheet(true);
                }}
              >
                <td>{trabajador.TRA_RUT}</td>
                <td>{`${trabajador.TRA_NOMBRES} ${trabajador.TRA_APELLIDOS}`}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No hay Trabajadores seleccionados.</td>
            </tr>
          )}
        </tbody>
      </table>

      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        header="Acciones"
        buttons={[
          {
            text: "Eliminar",
            role: "destructive",
            icon: trash,
            handler: () => {
              onEliminar(trabajadorSeleccionado.TRA_ID);
            },
          },
          {
            text: "Cancelar",
            role: "cancel",
            icon: close,
          },
        ]}
      />
    </div>
  );
};

export default TrabajadoresSeleccionados;
