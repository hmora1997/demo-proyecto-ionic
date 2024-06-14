import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import { obtenerReciboUrl } from '../services/consulta';

const EppEntregados = ({ data }) => {
    return (
        <>
            {data.map((item, index) => (
                <IonCard key={index}>
                    <IonCardHeader>
                        <IonCardTitle>{item.epp_nombre}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <div className="row">
                            <div className="col-8">
                                <p>Trabajador: <strong>{item.tra_nombre_completo}</strong></p>
                                <p>RUT: <strong>{item.tra_rut_completo}</strong></p>
                                <p>Fecha de entrega: <strong>{item.sol_fecha_entrega_format}</strong></p>
                                <p>Fecha de vencimiento: <strong>{item.sol_fecha_vencimiento}</strong></p>
                            </div>
                            <div className="col-4 ps-0 d-flex justify-content-center align-items-center">
                                <IonButton href={obtenerReciboUrl(item.sol_id)} target="_blank" className="m-2 h-75 fw-bold button-blue-recibo">
                                    Ver <br /> Recibo
                                </IonButton>
                            </div>
                        </div>
                    </IonCardContent>
                </IonCard>
            ))}
        </>
    );
};

export default EppEntregados;
