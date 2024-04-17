import React from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import BotonNavegacion from "./BotonNavegacion";
import UsuarioActual from "./UsuarioActual";
function ConsultaLinea() {
  return (
    <IonContent className=" page-color">
      <UsuarioActual usuario="admin@admin.cl" />

      <div className="container-fluid px-5 mt-4">
        <h2 className=" mb-3">Consulta en Línea</h2>
        <BotonNavegacion texto="Insumos entregados" href="/insumos-entregados" />
        <BotonNavegacion
          texto="Trabajadores con Insumos Vencidos"
          href="/trabajadores-insumos-vencidos"
        />
        <BotonNavegacion
          texto="Trabajadores con Insumos Pendientes"
          href="/trabajadores-insumos-pendientes"
        />
        <BotonNavegacion
          texto="Insumos Vencidos para el Trabajador"
          href="/insumos-vencidos-trabajador"
        />
        <BotonNavegacion
          texto="Insumos Pendientes para el Trabajador"
          href="/insumos-pendientes-trabajador"
        />
      </div>
    </IonContent>
  );
}

export default ConsultaLinea;
