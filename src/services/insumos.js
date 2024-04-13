import axios from "axios";
import config from "../config";

const obtenerInsumos = async () => {
  try {
    const respuesta = await axios.get(`${config.BASE_URL}epp/get`);

    const insumos = respuesta.data;
    return insumos;
  } catch (error) {
    console.error("Error al obtener los insumos:", error);
    throw error;
  }
};

export { obtenerInsumos };
