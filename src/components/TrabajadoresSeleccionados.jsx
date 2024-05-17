import { useState } from "react";
import { IonActionSheet, IonIcon } from "@ionic/react";
import { trash, close, pencil } from "ionicons/icons";
import Firma from "./Firma"; // Importa el componente de Firma

const TrabajadoresSeleccionados = ({ seleccionados, onEliminar }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showModal, setShowModal] = useState(false); // Agrega estado para controlar la apertura del modal
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);
  const [indexSeleccionado, setIndexSeleccionado] = useState(null);
 

  const handleOpenActionSheet = (trabajador, index) => {
    setTrabajadorSeleccionado(trabajador);
    setIndexSeleccionado(index);
    setShowActionSheet(true);
  };

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
            <th scope="col" className="th-custom">
              Firma
            </th>
          </tr>
        </thead>
        <tbody>
          {seleccionados.length > 0 ? (
            seleccionados.map((trabajador, index) => (
              <tr
                key={trabajador.tra_id}
                onClick={() => handleOpenActionSheet(trabajador, index)}
              >
                <td>{trabajador.tra_rut_completo}</td>
                <td>{trabajador.tra_nombre_completo}</td>
                <td>{trabajador.tra_nombre_completo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No hay Trabajadores seleccionados.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* IonActionSheet para las opciones */}
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
              setShowActionSheet(false); // Cierra el IonActionSheet
              setShowModal(true); // Abre el modal Firma
            },
          },
          {
            text: "Eliminar",
            role: "destructive",
            icon: trash,
            handler: () => {
              onEliminar(trabajadorSeleccionado.tra_id);
              setShowActionSheet(false); // Cierra el IonActionSheet
            },
          },
          {
            text: "Cancelar",
            role: "cancel",
            icon: close,
            handler: () => {
              setShowActionSheet(false); // Cierra el IonActionSheet
            },
          },
        ]}
      />
      {showModal && ( // Mostrar el modal solo cuando showModal es true
        <Firma
          position={indexSeleccionado} // Pasa el índice seleccionado a la componente Firma
          onClose={() => setShowModal(false)} // Cierra el modal Firma
        />
      )}
    </div>
  );
};

export default TrabajadoresSeleccionados;
