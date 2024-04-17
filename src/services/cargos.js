import axios from 'axios';
import config from '../config';

const obtenerCargos = async () => {
  try {

    const respuesta = await axios.get(`${config.BASE_URL}cargo/get`);
    const cargos = respuesta.data;
    console.log("CARGOS", JSON.stringify(cargos, null, 2));
    return cargos;
  } catch (error) {
    console.error("Error al obtener los cargos:", error);
    throw error;
  }
};

export { obtenerCargos };
