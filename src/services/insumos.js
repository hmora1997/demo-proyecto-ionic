import config from "../config";

const obtenerInsumos = async () => {
    try {
      const respuesta = await fetch(`${config.BASE_URL}epp/get`);
   
      const insumos = await respuesta.json();
      return insumos;
    } catch (error) {
      console.error("Error al obtener los insumos:", error);
      throw error;
    }
  };
  
  export { obtenerInsumos };
  