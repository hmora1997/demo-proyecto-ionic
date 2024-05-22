import UsuarioActual from "./UsuarioActual";
import { IonContent, IonButton } from "@ionic/react";
import epp from "../assets/epp.png";
import capacitacion from "../assets/capacitacion.png";
import perfil from "../assets/perfil.png";
import incidente from "../assets/incidente.png";
import inspeccion from "../assets/inspeccion.png";
import configuracion from "../assets/configuracion.png";
import "./MenuPrincipal.css";
import { useHistory } from "react-router-dom";
import BotonNavegacion from "./BotonNavegacion";

const MenuPrincipal = () => {
  const history = useHistory();

  const navigateTo = (path) => {
    history.push(path);
  };

  return (
    <IonContent className="page-color">
      <UsuarioActual />
      <div className="container-fluid px-4">
        <div className="row text-center ">
          <div className="col-6">
            <IonButton
              className="menu-button w-100"
              fill="clear"
              onClick={() => navigateTo("/home")}
            >
              <div className="menu-nav">
                <img width={85} src={epp} alt="epp" />
                <p>Epp</p>
              </div>
            </IonButton>
          </div>
          <div className="col-6">
            <IonButton
              className="menu-button w-100 disabled-button"
              fill="clear"
              onClick={() => navigateTo("/capacitacion")}
              style={{ opacity: "50%" }}
              disabled
            >
              <div className="menu-nav">
                <img width={85} src={capacitacion} alt="capacitacion" />
                <p>Capacitación</p>
              </div>
            </IonButton>
          </div>
          <div className="col-6">
            <IonButton
              className="menu-button w-100 disabled-button"
              fill="clear"
              onClick={() => navigateTo("/incidentes")}
              style={{ opacity: "50%" }}
              disabled
            >
              <div className="menu-nav">
                <img width={85} src={incidente} alt="incidente" />
                <p>Incidentes</p>
              </div>
            </IonButton>
          </div>
          <div className="col-6">
            <IonButton
              className="menu-button w-100 disabled-button"
              fill="clear"
              onClick={() => navigateTo("/inspecciones")}
              style={{ opacity: "50%" }}
              disabled
            >
              <div className="menu-nav">
                <img width={85} src={inspeccion} alt="inspeccion" />
                <p>Inspecciones</p>
              </div>
            </IonButton>
          </div>
          <div className="col-6">
            <IonButton
              className="menu-button w-100 disabled-button"
              fill="clear"
              onClick={() => navigateTo("/perfil")}
              style={{ opacity: "50%" }}
              disabled
            >
              <div className="menu-nav">
                <img width={85} src={perfil} alt="perfil" />
                <p>Perfil</p>
              </div>
            </IonButton>
          </div>
          <div className="col-6">
            <IonButton
              className="menu-button w-100 disabled-button"
              fill="clear"
              onClick={() => navigateTo("/configuracion")}
              style={{ opacity: "50%" }}
              disabled
            >
              <div className="menu-nav">
                <img width={85} src={configuracion} alt="configuracion" />
                <p>Opciones</p>
              </div>
            </IonButton>
          </div>
        </div>
        <div className="container-fluid px-0 mt-3">
          <BotonNavegacion
            colorButton={"button-red"}
            texto="Cerrar Sesión"
            ruta="/login"
          />
        </div>
      </div>
    </IonContent>
  );
};

export default MenuPrincipal;
