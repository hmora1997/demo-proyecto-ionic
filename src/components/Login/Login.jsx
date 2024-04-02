import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/react";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonColor, setButtonColor] = useState("blue");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log(username, password);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="login-background">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100%" }}
          >
            <div className="card w-100 rounded-0" style={{ maxWidth: "400px" }}>
              <div className="card-header  border-0 bg-light py-3 card-header-color text-center">
                <img
                  src="../public/logo-cbs.png"
                  alt="Logo"
                  className="img-fluid"
                  style={{ maxWidth: "80px" }} // Ajusta esto según tus necesidades
                />
              </div>
              <div className="card-body px-5 pb-5 card-color">
                <h5 className="fw-bold mt-3" >Gestión de Insumos - CBS</h5>
                <p className="text-dark text-center mb-4">
                  ¡Bienvenido de nuevo!
                </p>
                <form onSubmit={handleLogin}>
                  <IonLabel className="text-dark" position="stacked">
                    Usuario
                  </IonLabel>
                  <IonItem className="input-item mb-4">
                    <IonInput
                      type="text"
                      value={username}
                      clearInput
                      placeholder="Nombre de usuario"
                      onIonChange={(e) => setUsername(e.detail.value)}
                      className=""
                    />
                  </IonItem>
                  <IonLabel className="text-dark" position="stacked">
                    Contraseña
                  </IonLabel>
                  <IonItem className="input-item mb-4">
                    <IonInput
                      type="password"
                      value={password}
                      placeholder="Contraseña"
                      onIonChange={(e) => setPassword(e.detail.value)}
                      clearInput
                      className=""
                    />
                  </IonItem>
                  <IonButton
                  routerLink="/home"
                  className={`mx-0 fw-bold custom-button ${
                    buttonColor === "red" ? "button-red" : "button-blue"
                  }`}
                  expand="block"
                >
                  Ingresar
                </IonButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
