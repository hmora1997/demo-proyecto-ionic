import React, { useState, useEffect, lazy, Suspense } from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./AuthContext";
import CustomModal from "./components/CustomModal";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/AuthLayout";
import { Network } from "@capacitor/network";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./theme/variables.css";


setupIonicReact();

const Login = lazy(() => import("./components/Login/Login.jsx"));
const MenuPrincipalPage = lazy(() => import("./pages/MenuPrincipalPage"));
const HomePageEpp = lazy(() => import("./pages/HomePageEpp"));
const InsumosPage = lazy(() => import("./pages/InsumosPage"));
const HomePageCapacitaciones = lazy(() => import("./pages/HomePageCapacitaciones"));
const CapacitacionesPage = lazy(() => import("./pages/CapacitacionesPage"));
const ConsultaPage = lazy(() => import("./pages/ConsultaPage"));

const App: React.FC = () => {
  const [showNoInternetModal, setShowNoInternetModal] = useState(false);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      const status = await Network.getStatus();
      setShowNoInternetModal(!status.connected);
    };

    const handleNetworkStatusChange = (status: any) => {
      setShowNoInternetModal(!status.connected);
    };

    Network.addListener('networkStatusChange', handleNetworkStatusChange);

    checkNetworkStatus();

    return () => {
      Network.removeAllListeners();
    };
  }, []);

  return (
    <AuthProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Suspense>
              <Route exact path="/login">
                <AuthLayout>
                  <Login />
                </AuthLayout>
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <ProtectedRoute exact path="/home" component={HomePageEpp} />
              <ProtectedRoute exact path="/menu" component={MenuPrincipalPage} />
              <ProtectedRoute exact path="/capacitacion" component={HomePageCapacitaciones} />
              <ProtectedRoute exact path="/consulta/:tipo" component={ConsultaPage} />
              <ProtectedRoute exact path="/entrega-epp-insumos" component={InsumosPage} />
              <ProtectedRoute exact path="/entrega-capacitacion" component={CapacitacionesPage} />
            </Suspense>
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
    </AuthProvider>
  );
};

export default App;
