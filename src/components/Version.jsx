import React, { useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import './version.css';

const AppVersionComponent = () => {
  const [versionNumber, setVersionNumber] = useState('');

  useEffect(() => {
    const getAppVersion = async () => {
      try {
        const appInfo = await App.getInfo();
        setVersionNumber(appInfo.version);
        console.log('Número de versión:', appInfo.version);
      } catch (error) {
        console.error('Error al obtener la versión:', error);
      }
    };

    getAppVersion();
  }, []);

  return (
    <div>
      <span className="texto-version" >V{versionNumber}</span>
    </div>
  );
};

export default AppVersionComponent;