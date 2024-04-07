import config from "../config";

const obtenerTrabajadores = async () => {
    try {
      const respuesta = await fetch(`${config.BASE_URL}trabajador/get`);
     
      const trabajadores = await respuesta.json();
      return trabajadores;
    } catch (error) {
      console.error("Error al obtener los trabajadores:", error);
      throw error;
    }
  };
  
  export { obtenerTrabajadores };
  