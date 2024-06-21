import React, { useState, useEffect } from 'react';
import {
  IonModal, IonHeader, IonButton, IonIcon, IonSearchbar, IonContent, IonFooter,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

const SelectorModal = ({ isOpen, onClose, title, items, selectedItem, setSelectedItem, searchPlaceholder }) => {
  const [searchText, setSearchText] = useState('');
  const [tempSelectedItem, setTempSelectedItem] = useState(selectedItem);

  useEffect(() => {
    setTempSelectedItem(selectedItem);
  }, [selectedItem]);

  const handleSearch = (ev) => {
    const query = ev.target.value.toLowerCase();
    setSearchText(query);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchText)
  );

  const confirmSelection = () => {
    setSelectedItem(tempSelectedItem);
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader className="d-flex justify-content-between align-items-center px-2">
        <h5 className="ms-1 mt-0 mb-0 me-0">{title}</h5>
        <IonButton
          className="fw-bold button-blue"
          fill="clear"
          onClick={onClose}
        >
          <IonIcon icon={closeOutline} />
        </IonButton>
      </IonHeader>
      <div className="container-fluid mb-2">
        <IonSearchbar
          value={searchText}
          animated={true}
          onIonInput={handleSearch}
          debounce={300}
          placeholder={searchPlaceholder}
          className="px-0 mx-0"
        />
      </div>
      <IonContent>
        {filteredItems.length === 0 ? (
          <div className="text-center mt-3">
            <p>No se encontraron resultados.</p>
          </div>
        ) : (
          <div className="list-group">
            {filteredItems.map((item, index) => (
              <label key={index} className="list-group-item d-flex align-items-center" style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  className="form-check-input me-1"
                  checked={tempSelectedItem === item.id}
                  onChange={() => setTempSelectedItem(item.id)}
                />
                <div className="ms-3 w-100">
                  <strong>{item.name}</strong>
                </div>
              </label>
            ))}
          </div>
        )}
      </IonContent>
      <IonFooter>
        <IonButton expand="block" onClick={confirmSelection} className="w-100 mx-0 mb-0 fw-bold button-blue">
          Confirmar Selección
        </IonButton>
      </IonFooter>
    </IonModal>
  );
};

export default SelectorModal;
