import UsuarioActual from "./UsuarioActual";
import epp from "../assets/epp.png";
import capacitacion from "../assets/capacitacion.png";
import perfil from "../assets/perfil.png";
import incidente from "../assets/incidente.png";
import inspeccion from "../assets/inspeccion.png";
import configuracion from "../assets/configuracion.png";
import "./MenuPrincipal.css";
import { Link } from "react-router-dom";
import BotonNavegacion from "./BotonNavegacion";

const MenuPrincipal = () => {
  return (
    <section>
      <UsuarioActual usuario="admin@admin.cl" />
      <div className="container">
        <div className="row text-center ">
          <div className="col-6 ">
            <div className="menu-nav">
              <Link to="/home">
                <img width={85} src={epp} alt="epp" />
                <p>Epp</p>
              </Link>
            </div>
          </div>
          <div className="col-6 ">
            <div className="menu-nav" style={{ opacity: "50%" }}>
              <img width={85} src={capacitacion} alt="capacitacion" />
              <p>Capacitación</p>
            </div>
          </div>
          <div className="col-6 ">
            <div className="menu-nav" style={{ opacity: "50%" }}>
              <img width={85} src={incidente} alt="incidente" />
              <p>Incidentes</p>
            </div>
          </div>
          <div className="col-6 ">
            <div className="menu-nav" style={{ opacity: "50%" }}>
              <img width={85} src={inspeccion} alt="inspeccion" />
              Inspecciones
            </div>
          </div>
          <div className="col-6 ">
            <div className="menu-nav" style={{ opacity: "50%" }}>
              <img width={85} src={perfil} alt="perfil" />
              Perfil
            </div>
          </div>
          <div className="col-6 ">
            <div className="menu-nav" style={{ opacity: "50%" }}>
              <img width={85} src={configuracion} alt="configuracion" />
              Opciones
            </div>
          </div>
        </div>
        <div style={{width:"95%", marginTop: '20px'}}>
          <BotonNavegacion
            colorButton={"button-red"}
            texto="Cerrar Sesión"
            ruta="/login"
          />
        </div>
      </div>
    </section>
  );
};

export default MenuPrincipal;
