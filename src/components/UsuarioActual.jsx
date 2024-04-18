import React from "react";
import { useAuth } from "../AuthContext";

const UsuarioActual = () => {
  const { userData } = useAuth();  
  console.log(userData);
  return (
    <div className="color-usuario w-100 text-white text-start ps-5 mb-3">
      <span className="fw-bold"> Usuario Actual:</span> 
      <span className="mx-2">{userData ? userData.USU_NOMBRE : "No hay usuario logueado"}</span>
      
    </div>
  );
};

export default UsuarioActual;
