import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonContent, IonItem, IonLabel, IonButton, IonLoading, IonRefresher, IonRefresherContent,
  IonToast, IonInput,
} from '@ionic/react';
import { realizarConsulta } from '../services/consulta';
import { obtenerInsumos } from '../services/insumos';
import { obtenerTrabajadores } from '../services/trabajadores';
import UsuarioActual from './UsuarioActual';
import EppEntregados from './consultaLinea/EppEntregados';
import EppPendientes from './consultaLinea/EppPendientes';
import SelectorModal from './consultaLinea/SelectorModal';
import './menu-consulta.css';

import { IonIcon } from '@ionic/react';
import { closeCircleOutline, closeOutline } from 'ionicons/icons';

const MenuConsulta = () => {
  const { tipo } = useParams();
  const [data, setData] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEPP, setSelectedEPP] = useState('');
  const [selectedRUT, setSelectedRUT] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showModalEPP, setShowModalEPP] = useState(false);
  const [showModalTrabajador, setShowModalTrabajador] = useState(false);

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
    if (!selectedEPP && !selectedRUT) {
      setToastMessage('Debes seleccionar al menos un criterio de búsqueda (EPP o RUT Trabajador).');
      setShowToast(true);
      return;
    }

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
        setToastMessage('No se encontraron datos para los criterios seleccionados.');
        setShowToast(true);
      }
    } catch (err) {
      console.error('Error en la consulta:', err);
      setError(err.toString());
      setToastMessage(err.toString());
      setShowToast(true);
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

  const formatTipo = tipo => {
    return tipo.split('_').map((word, index) => {
      if (word.toLowerCase() === "epp") {
        return "EPP";
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
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
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        color={'danger'}
        duration={2000}
        position="top"
      />
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
        <h2 className="mb-3">Consulta: {formatTipo(tipo)}</h2>
        <IonLabel>EPP</IonLabel>
        <IonItem className='input-item mb-2' onClick={() => setShowModalEPP(true)}>
          <IonInput
            value={insumos.find(insumo => insumo.epp_id === selectedEPP)?.epp_nombre || 'Seleccionar EPP'}
            placeholder="Seleccionar EPP"
            readonly
          />
        </IonItem>
        <SelectorModal
          isOpen={showModalEPP}
          onClose={() => setShowModalEPP(false)}
          title="Selecciona un EPP"
          items={insumos.map(insumo => ({ id: insumo.epp_id, name: insumo.epp_nombre }))}
          selectedItem={selectedEPP}
          setSelectedItem={setSelectedEPP}
          searchPlaceholder="Buscar por nombre de EPP"
        />
        <IonLabel>Trabajador</IonLabel>
        <IonItem className='input-item mb-2' onClick={() => setShowModalTrabajador(true)}>
          <IonInput
            value={trabajadores.find(trabajador => trabajador.tra_rut === selectedRUT)?.tra_apellidos_nombre || 'Seleccionar Trabajador'}
            placeholder="Seleccionar Trabajador"
            readonly
          />
        </IonItem>
        <SelectorModal
          isOpen={showModalTrabajador}
          onClose={() => setShowModalTrabajador(false)}
          title="Selecciona un Trabajador"
          items={trabajadores.map(trabajador => ({ id: trabajador.tra_rut, name: trabajador.tra_apellidos_nombre }))}
          selectedItem={selectedRUT}
          setSelectedItem={setSelectedRUT}
          searchPlaceholder="Buscar por nombre de trabajador"
        />

        <div className="container-fluid">
          <div className="row px-0">
            <div className="col-9 px-0">
              <IonButton expand="block" className="custom-button h-75 mx-0 button-blue" onClick={handleBuscar}>Buscar</IonButton>
            </div>
            <div className="col-3 px-0">
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
