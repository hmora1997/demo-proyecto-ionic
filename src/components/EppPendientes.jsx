import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

const EppPendientes = ({ data }) => {
    return (
        <>
            {data.map((item, index) => (
                <IonCard key={index}>
                    <IonCardHeader>
                        <IonCardTitle>{item.epp_nombre}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>Trabajador: <strong>{item.tra_nombre_completo}</strong></p>
                        <p>RUT: <strong>{item.tra_rut_completo}</strong></p>
                        <p>Vida útil (meses): <strong>{item.epp_vida}</strong></p>
                      
                    </IonCardContent>
                </IonCard>
            ))}
        </>
    );
};

export default EppPendientes;
