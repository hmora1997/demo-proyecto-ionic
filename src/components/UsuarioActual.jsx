import React from "react";

const UsuarioActual = ({ usuario = "admin@admin.cl" }) => {
  return (
    <div className="color-usuario w-100 text-white text-start ps-5 mb-3">
      <span className="fw-bold"> Usuario Actual:</span> {usuario}
    </div>
  );
};

export default UsuarioActual;
