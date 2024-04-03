import { IonInput, IonItem, IonLabel } from "@ionic/react";
import React from "react";

const Input = ({children,placeholder,type}) => {
  return (
    <>
      {" "}
      <IonLabel className="text-dark" position="stacked">
        {children}
      </IonLabel>
      <IonItem className="input-item mb-4">
        <IonInput
          type={type}
          clearInput
          placeholder={placeholder}
          className=""
        />
      </IonItem>
    </>
  );
};

export default Input;
