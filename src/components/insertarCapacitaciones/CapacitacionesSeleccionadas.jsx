import React, { useState } from 'react';
import { IonActionSheet } from '@ionic/react';
import { trash, close } from 'ionicons/icons';

const CapacitacionesSeleccionadas = ({ seleccionados, onEliminar }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [capacitacionSeleccionada, setCapacitacionesSeleccionada] = useState(null);

  return (
    <div className="container-fluid px-0 mt-1">
      <table className="table table-sm table-bordered table-custom text-center align-middle">
        <thead>
          <tr>
            <th scope="col" className="th-custom">Código</th>
            <th scope="col" className="th-custom">Capacitación</th>
          </tr>
        </thead>
        <tbody>
          {seleccionados.length > 0 ? (
            seleccionados.map((capacitacion) => (
              <tr
                key={capacitacion.cap_id}
                onClick={() => {
                  setCapacitacionesSeleccionada(capacitacion);
                  setShowActionSheet(true);
                }}
              >
                <td>{capacitacion.cap_id}</td>
                <td>{`${capacitacion.cap_nombre} - ${capacitacion.cap_descripcion} - ${capacitacion.cap_vida}`}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay Capacitaciones seleccionadas.</td>
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
            text: 'Eliminar',
            role: 'destructive',
            icon: trash,
            handler: () => {
              onEliminar(capacitacionSeleccionada.cap_id);
            },
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            icon: close,
          },
        ]}
      />
    </div>
  );
};

export default CapacitacionesSeleccionadas;
