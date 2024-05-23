import { useState } from "react";
import { IonActionSheet, IonIcon } from "@ionic/react";
import { trash, close, pencil } from "ionicons/icons";
import Firma from "./Firma"; // Importa el componente de Firma

const TrabajadoresSeleccionados = ({ seleccionados, onEliminar, setSeleccionados, firmas, setFirmas }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showModal, setShowModal] = useState(false); // Agrega estado para controlar la apertura del modal
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);
  const [indexSeleccionado, setIndexSeleccionado] = useState(null);

  const handleOpenActionSheet = (trabajador, index) => {
    setTrabajadorSeleccionado(trabajador);
    setIndexSeleccionado(index);
    setShowActionSheet(true);
  };

  const handleSaveFirma = (firma) => {
    const updatedFirmas = { ...firmas, [trabajadorSeleccionado.tra_id]: firma };
    setFirmas(updatedFirmas);
    console.log('Firma guardada:', updatedFirmas);
    setShowModal(false); // Cierra el modal Firma
  };

  const handleDeleteFirma = () => {
    const updatedFirmas = { ...firmas };
    delete updatedFirmas[trabajadorSeleccionado.tra_id];
    console.log('Firma eliminada:', updatedFirmas);
    setFirmas(updatedFirmas);
    setShowModal(false); // Cierra el modal Firma
  };

  const handleEliminar = (trabajadorId) => {
    console.log('Eliminar trabajador con ID:', trabajadorId);
    onEliminar(trabajadorId);
    const updatedFirmas = { ...firmas };
    delete updatedFirmas[trabajadorId];
    console.log('Firma eliminada:', updatedFirmas);
    setFirmas(updatedFirmas);
    setShowActionSheet(false); // Cierra el IonActionSheet
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
                <td>
                  {firmas[trabajador.tra_id] ? (
                    <img src={firmas[trabajador.tra_id]} alt="Firma" style={{ height: "50px" }} />
                  ) : (
                    "Sin Firma"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay Trabajadores seleccionados.</td>
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
              setShowActionSheet(false); // Cierra el IonActionSheet
              setShowModal(true); // Abre el modal Firma
            },
          },
          {
            text: "Eliminar",
            role: "destructive",
            icon: trash,
            handler: () => {
              handleEliminar(trabajadorSeleccionado.tra_id);
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
          position={indexSeleccionado} // Pasa el índice seleccionado al componente Firma
          onClose={() => setShowModal(false)} // Cierra el modal Firma
          onSave={handleSaveFirma} // Función para guardar la firma
          onDelete={handleDeleteFirma} // Función para eliminar la firma
        />
      )}
    </div>
  );
};

export default TrabajadoresSeleccionados;
