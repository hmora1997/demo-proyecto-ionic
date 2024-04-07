import config from "../config";

const obtenerBodegas = async () => {
  try {
    const respuesta = await fetch(`${config.BASE_URL}bodega/get`);
    const bodegas = await respuesta.json();
    return bodegas;
  } catch (error) {
    console.error("Error al obtener las bodegas:", error);
    throw error;
  }
};

export { obtenerBodegas };
