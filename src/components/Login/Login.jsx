import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/react";
import Logo from "../Logo";

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
            className="d-flex justify-content-center align-items-center m-3"
            style={{ minHeight: "100%" }}
          >
            <div className="card w-100 rounded-0" style={{ maxWidth: "400px" }}>
              <div className="card-header  border-0 bg-light py-3 card-header-color text-center">
              <Logo />
              </div>
              <div className="card-body px-5 pb-5 card-color">
                <h5 className="fw-bold text-center mt-3 fs-6 fs-md-5">
                  Gestión de Insumos - CBS
                </h5>

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
                  <a
                    href="/home"
                    className={`btn w-100 text-white px-0 mx-0 py-2 fw-bold rounded-0 custom-button ${
                    buttonColor === "red" ? "button-red" : "button-blue"
                    }`}
                    expand="block"
                  >
                    Ingresar
                  </a>
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
