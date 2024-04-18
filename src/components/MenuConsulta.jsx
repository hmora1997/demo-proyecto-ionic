import React from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import BotonNavegacion from "./BotonNavegacion";
import UsuarioActual from "./UsuarioActual";
function MenuConsulta() {
  return (
    <IonContent className=" page-color">
      <UsuarioActual usuario="admin@admin.cl" />

      <div className="container-fluid px-5 mt-4">
        <h2 className=" mb-3">Consulta en Línea</h2>
        <BotonNavegacion texto="Insumos entregados" ruta="/insumos-entregados" />
        <BotonNavegacion
          texto="Trabajadores con Insumos Vencidos"
          ruta="/trabajadores-insumos-vencidos"
        />
        <BotonNavegacion
          texto="Trabajadores con Insumos Pendientes"
          ruta="/trabajadores-insumos-pendientes"
        />
        <BotonNavegacion
          texto="Insumos Vencidos para el Trabajador"
          ruta="/insumos-vencidos-trabajador"
        />
        <BotonNavegacion
          texto="Insumos Pendientes para el Trabajador"
          ruta="/insumos-pendientes-trabajador"
        />
      </div>
    </IonContent>
  );
}

export default MenuConsulta;
