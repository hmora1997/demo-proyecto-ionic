import React, { useState } from 'react';
import { IonActionSheet, IonAlert } from '@ionic/react';
import { trash, pencil, close } from 'ionicons/icons';

const InsumosSeleccionados = ({ seleccionados, onEliminar, onEditar }) => {
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [cantidadTemporal, setCantidadTemporal] = useState(1);
    const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);

    return (
        <div className="container-fluid px-0 mt-1">
            <table className="table table-sm table-bordered table-custom text-center align-middle">
                <thead>
                    <tr>
                        <th scope="col" className="th-custom">Código</th>
                        <th scope="col" className="th-custom">EPP o Insumo</th>
                        <th scope="col" className="th-custom">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {seleccionados.length > 0 ? (
                        seleccionados.map((insumo) => (
                            <tr
                                key={insumo.epp_id}
                                onClick={() => {
                                    setInsumoSeleccionado(insumo);
                                    setShowActionSheet(true);
                                }}
                            >
                                <td>{insumo.epp_id}</td>
                                <td>{`${insumo.epp_nombre} - ${insumo.epp_talla} - ${insumo.epp_marca}`}</td>
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
                            onEliminar(insumoSeleccionado.epp_id);
                        },
                    },
                    {
                        text: 'Editar cantidad',
                        icon: pencil,
                        handler: () => {
                            setCantidadTemporal(insumoSeleccionado.cantidad);
                            setShowAlert(true);
                        },
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        icon: close,
                    },
                ]}
            />

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'Editar cantidad'}
                inputs={[
                    {
                        name: 'cantidad',
                        type: 'number',
                        value: cantidadTemporal.toString(),
                        placeholder: 'Nueva cantidad'
                    },
                ]}
                buttons={[
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                    },
                    {
                        text: 'Ok',
                        handler: (alertData) => {
                            onEditar(insumoSeleccionado.epp_id, parseInt(alertData.cantidad, 10) || 1);
                            setShowAlert(false);
                        },
                    },
                ]}
            />
        </div>
    );
};

export default InsumosSeleccionados;
