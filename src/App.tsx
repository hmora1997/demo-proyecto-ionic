import React, { useState, useEffect } from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import "./index.css"; // Asegúrate de que el camino sea correcto
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import EppInsumos from "./components/EppInsumos";
import CustomModal from "./components/CustomModal";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar el CSS de Bootstrap

/* Theme variables */
import "./theme/variables.css";
import Insumos from "./pages/Insumos";

setupIonicReact();

const App: React.FC = () => {
  const [showNoInternetModal, setShowNoInternetModal] = useState(false);

  useEffect(() => {
    const checkInternetConnection = () => {
      const online = navigator.onLine;
      setShowNoInternetModal(!online);
      if (online) {
        console.log("Conexión a internet activa.");
      } else {
        console.log("Se ha perdido la conexión a internet.");
      }
    };

    // Verificar la conexión a internet cada 5 segundos
    const intervalId = setInterval(checkInternetConnection, 5000);

    // Realizar una verificación inicial al cargar la app
    checkInternetConnection();

    // Añadir event listeners para cambios de conexión
    window.addEventListener('online', checkInternetConnection);
    window.addEventListener('offline', checkInternetConnection);

    // Limpiar el intervalo y los event listeners cuando el componente se desmonte
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('online', checkInternetConnection);
      window.removeEventListener('offline', checkInternetConnection);
    };
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/entrega-epp-insumos">
            <Insumos />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          {/* Definición de otras rutas... */}
        </IonRouterOutlet>
      </IonReactRouter>

      <CustomModal
        isOpen={showNoInternetModal}
        title="Error de Conexión"
        message="Para seguir utilizando la aplicación, por favor verifica tu conexión a internet."
        buttons={[]}
        onClose={() => setShowNoInternetModal(false)}
        isSubmitting={false}
      />
    </IonApp>
  );
};

export default App;