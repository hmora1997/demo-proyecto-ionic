import config from "../config";

const obtenerCargos = async () => {
  try {
    const respuesta = await fetch(`${config.BASE_URL}cargo/get`);

    const cargos = await respuesta.json();
    console.log("CARGOS", cargos);
    return cargos;
  } catch (error) {
    console.error("Error al obtener los cargos:", error);
    throw error; 
  }
};

export { obtenerCargos };
