import { useHistory } from "react-router-dom";
import { useState } from "react";
import { IonContent, IonButton, IonToast } from "@ionic/react";
import { useAuth } from "../AuthContext";
import UsuarioActual from "./UsuarioActual";
import epp from "../assets/epp.png";
import capacitacion from "../assets/capacitacion.png";
import perfil from "../assets/perfil.png";
import incidente from "../assets/incidente.png";
import inspeccion from "../assets/inspeccion.png";
import configuracion from "../assets/configuracion.png";
import "./MenuPrincipal.css";




const MenuPrincipal = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("danger");

  const navigateTo = (path) => {
    history.push(path);
  };

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  const handleButtonClick = (path) => {
    if (path === "/home" || path === "/capacitacion") {
      navigateTo(path);
    } else {
      setToastMessage("Esta funcionalidad está en proceso.");
      setToastColor("danger");
      setShowToast(true);
    }
  };

  return (
    <IonContent className="page-color">
      <UsuarioActual />
      <div className="container-fluid px-4">
        <div className="grid-container gap-2">
          <div className="grid-item">
            <IonButton
              expand="block"
              className="menu-button"
              fill="clear"
              onClick={() => handleButtonClick("/home")}
            >
              <div className="menu-nav">
                <img width={85} src={epp} alt="epp" />
                <p>Epp</p>
              </div>
            </IonButton>
          </div>

          <div className="grid-item">
            <IonButton
              expand="block"
              className="menu-button"
              fill="clear"
              onClick={() => handleButtonClick("/capacitacion")}
            >
              <div className="menu-nav">
                <img width={85} src={capacitacion} alt="capacitacion" />
                <p>Capacitación</p>
              </div>
            </IonButton>
          </div>

          <div className="grid-item">
            <IonButton
              expand="block"
              className="menu-button"
              fill="clear"
              onClick={() => handleButtonClick("/incidentes")}
            >
              <div className="menu-nav">
                <img width={85} src={incidente} alt="incidente" />
                <p>Incidentes</p>
              </div>
            </IonButton>
          </div>

          <div className="grid-item">
            <IonButton
              expand="block"
              className="menu-button "
              fill="clear"
              onClick={() => handleButtonClick("/inspecciones")}
            >
              <div className="menu-nav">
                <img width={85} src={inspeccion} alt="inspeccion" />
                <p>Inspecciones</p>
              </div>
            </IonButton>
          </div>

          <div className="grid-item">
            <IonButton
              expand="block"
              className="menu-button "
              fill="clear"
              onClick={() => handleButtonClick("/perfil")}
            >
              <div className="menu-nav">
                <img width={85} src={perfil} alt="perfil" />
                <p>Perfil</p>
              </div>
            </IonButton>
          </div>

          <div className="grid-item">
            <IonButton
              expand="block"
              className="menu-button"
              fill="clear"
              onClick={() => handleButtonClick("/configuracion")}
            >
              <div className="menu-nav">
                <img width={85} src={configuracion} alt="configuracion" />
                <p>Opciones</p>
              </div>
            </IonButton>
          </div>
        </div>

        <div className="container-fluid px-0 my-3">
          <IonButton
            expand="block"
            onClick={handleLogout}
            className={"custom-button mx-0 button-red"}
          >
            Cerrar Sesión
          </IonButton>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastColor}
          position="top"
        />
      </div>
    </IonContent>
  );
};

export default MenuPrincipal;
