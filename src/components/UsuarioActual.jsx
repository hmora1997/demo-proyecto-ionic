import React from "react";
import { useAuth } from "../AuthContext";
import Version from "./Version";

const UsuarioActual = ({ className }) => {
  const { userData } = useAuth();  
  return (
    <div className={`color-usuario d-flex justify-content-between align-items-center  w-100 text-white  px-4 mb-3`}>
      <div>
      <span className="fw-bold"> Usuario Actual:</span> 
      <span className="mx-1">{userData ? userData.usu_nombre_completo : "No hay usuario logueado"}</span>
      </div>
      <div>
        <Version/>
      </div>
   
    </div>
  );
};

export default UsuarioActual;
