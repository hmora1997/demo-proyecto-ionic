import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonToast,
} from "@ionic/react";
import Logo from "../Logo";
import { useAuth } from "../../AuthContext";
import { login as loginService } from "../../services/login";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("danger");
  const { login } = useAuth();
  const history = useHistory(); // Inicializa useHistory
  const [buttonColor, setButtonColor] = useState("blue");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService(username, password);
      if (response.data && response.data.length > 0) {
        login(response.data[0]); // Guardar datos del usuario en el contexto
        setToastMessage("Inicio de sesión exitoso!");
        setToastColor("success");
        setShowToast(true);
        setTimeout(() => {
          history.push("/menu"); // Redirigir a la página home si el login es exitoso
        }, 2000); // Dar tiempo para que el usuario vea el mensaje
      } else {
        setToastMessage("Usuario o contraseña incorrectos.");
        setToastColor("danger");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("Error al intentar iniciar sesión.");
      setToastColor("danger");
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastColor}
          position="top"
        />
        <div className="login-background">
          <div
            className="d-flex justify-content-center align-items-center m-3"
            style={{ minHeight: "100%" }}
          >
            <div className="card w-100 rounded-0" style={{ maxWidth: "400px" }}>
              <div className="card-header border-0 bg-light py-3 card-header-color text-center">
                <Logo />
              </div>
              <div className="card-body px-5 pb-5 card-color">
                <h5 className="fw-bold text-center mt-3 fs-6 fs-md-5">
                  Gestión y control
                </h5>
                <h5 className="fw-bold text-center mt-1 fs-6 fs-md-5">
                  SSOMA CONSTRUCTORA GARCÍA
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
                  <IonButton
                    expand="block"
                    type="submit"
                    className={`custom-button ${
                      buttonColor === "red" ? "button-red" : "button-blue"
                    }`}
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
