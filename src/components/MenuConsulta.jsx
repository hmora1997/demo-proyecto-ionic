import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  IonContent, IonSelect, IonSelectOption, IonItem, IonLabel, IonButton, IonLoading, IonRefresher, IonRefresherContent
} from '@ionic/react';
import { realizarConsulta } from '../services/consulta';
import { obtenerInsumos } from '../services/insumos';
import { obtenerTrabajadores } from '../services/trabajadores';
import UsuarioActual from './UsuarioActual';
import EppEntregados from './EppEntregados';
import EppPendientes from './EppPendientes';
import './menu-consulta.css';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline, closeOutline } from 'ionicons/icons';


const MenuConsulta = () => {
  const { tipo } = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEPP, setSelectedEPP] = useState('');
  const [selectedRUT, setSelectedRUT] = useState('');

  useEffect(() => {

    fetchSelectores();
  }, []);

  const fetchSelectores = async () => {
    setIsLoading(true);
    try {
      setData([]);
      setInsumos([]);
      setTrabajadores([]);
      setSelectedEPP('');
      setSelectedRUT('');

      const [trabajadoresData, insumosData] = await Promise.all([
        obtenerTrabajadores(),
        obtenerInsumos()
      ]);
      setTrabajadores(trabajadoresData);
      setInsumos(insumosData);
    } catch (err) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  };



  const handleBuscar = async () => {
    setIsLoading(true);
    try {
      const queryParams = {
        ...(selectedEPP && { epp_id: selectedEPP }),
        ...(selectedRUT && { tra_rut: selectedRUT })
      };
      const result = await realizarConsulta(tipo, queryParams);
      if (Array.isArray(result) && result.length > 0) {
        setData(result);
        setError(null);
      } else {
        setData([]);
        setError('No se encontraron datos para los criterios seleccionados.');
      }
    } catch (err) {
      console.error('Error en la consulta:', err);
      setError(err.toString());
    }
    setIsLoading(false);
  };

  const resetFilters = () => {
    setSelectedEPP('');
    setSelectedRUT('');

  };

  const doRefresh = async (event) => {
    console.log('Refrescando...');
    await fetchSelectores();
    event.detail.complete();
  };


  const renderContent = () => {
    switch (tipo) {
      case 'epp_entregado':
        return <EppEntregados data={data} />;
      case 'epp_pendientes':
        return <EppPendientes data={data} />;
      default:
        return <p>Consulta no reconocida.</p>;
    }
  };

  return (
    <IonContent className="page-color">
      <UsuarioActual />
      <IonLoading isOpen={isLoading} message={'Cargando...'} spinner="crescent" />
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent
          pullingIcon="arrow-dropdown"
          pullingText="Desliza hacia abajo para refrescar"
          refreshingSpinner="crescent"
          refreshingText="Refrescando..."
          style={{ '--offset-top': '20px' }}
        ></IonRefresherContent>
      </IonRefresher>

      <div className="container-fluid px-4 mt-4">
        <h2 className="mb-3">Consulta: {tipo.replace('_', ' ')}</h2>
        <IonLabel>EPP</IonLabel>
        <IonItem className='input-item mb-2'>
          <IonSelect value={selectedEPP} placeholder="EPP" onIonChange={e => setSelectedEPP(e.detail.value)}>
            {insumos.map((epp, index) => (
              <IonSelectOption key={index} value={epp.epp_id}>{epp.epp_nombre}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonLabel>RUT Trabajador</IonLabel>
        <IonItem className='input-item mb-2'>
          <IonSelect value={selectedRUT} placeholder="RUT Trabajador" onIonChange={e => setSelectedRUT(e.detail.value)}>
            {trabajadores.map((tra, index) => (
              <IonSelectOption key={index} value={tra.tra_rut}>{tra.tra_nombre_completo}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <div className="container-fluid">
          <div className="row px-0">
            <div className="col-9  px-0">
              <IonButton expand="block" className="custom-button h-75 mx-0 button-blue" onClick={handleBuscar}>Buscar</IonButton>
            </div>
            <div className="col-3  px-0">
              <IonButton expand="block" className="custom-button h-75 me-0 button-blue-border" onClick={resetFilters}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </div>
          </div>
        </div>
        {renderContent()}
      </div>
    </IonContent>
  );

};

export default MenuConsulta;
