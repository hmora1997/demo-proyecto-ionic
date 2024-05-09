import { useRef, useState } from "react";
import { IonActionSheet } from "@ionic/react";
import { trash, close, pencil } from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";

const TrabajadoresSeleccionados = ({ seleccionados, onEliminar }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);
  const history = useHistory();

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
                key={trabajador.tra_id}
                onClick={() => {
                  setTrabajadorSeleccionado(trabajador);
                  setShowActionSheet(true);
                }}
              >
                <td>{trabajador.tra_rut_completo}</td>
                <td>{`${trabajador.tra_nombre_completo}`}</td>
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
            text: "Firma",
            role: "selected",
            icon: pencil,
            handler: () => {
              history.push("/firma", {
                trabajadorId: trabajadorSeleccionado.tra_id,
              });
            },
          },
          {
            text: "Eliminar",
            role: "destructive",
            icon: trash,
            handler: () => {
              onEliminar(trabajadorSeleccionado.tra_id);
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
