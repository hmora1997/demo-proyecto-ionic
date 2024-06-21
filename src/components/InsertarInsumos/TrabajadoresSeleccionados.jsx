import { useState } from "react";
import { IonActionSheet, IonIcon } from "@ionic/react";
import { trash, close, pencil } from "ionicons/icons";
import Firma from "../Firma";

const TrabajadoresSeleccionados = ({ seleccionados, onEliminar, setSeleccionados, firmas, setFirmas }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(false);
  };

  const handleDeleteFirma = () => {
    const updatedFirmas = { ...firmas };
    delete updatedFirmas[trabajadorSeleccionado.tra_id];
    console.log('Firma eliminada:', updatedFirmas);
    setFirmas(updatedFirmas);
    setShowModal(false);
  };

  const handleEliminar = (trabajadorId) => {
    console.log('Eliminar trabajador con ID:', trabajadorId);
    onEliminar(trabajadorId);
    const updatedFirmas = { ...firmas };
    delete updatedFirmas[trabajadorId];
    console.log('Firma eliminada:', updatedFirmas);
    setFirmas(updatedFirmas);
    setShowActionSheet(false);
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
              setShowActionSheet(false);
              setShowModal(true);
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
              setShowActionSheet(false);
            },
          },
        ]}
      />
      {showModal && (
        <Firma
          title={`Firma Trabajador ${trabajadorSeleccionado.tra_nombre_completo}`}
          position={indexSeleccionado}
          onClose={() => setShowModal(false)}
          onSave={handleSaveFirma}
          onDelete={handleDeleteFirma}
        />
      )}
    </div>
  );
};

export default TrabajadoresSeleccionados;
