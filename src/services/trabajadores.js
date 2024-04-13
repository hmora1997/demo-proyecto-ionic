import axios from 'axios';
import config from '../config';

const obtenerTrabajadores = async () => {
  try {
    // Realizamos la petición GET utilizando Axios
    const respuesta = await axios.get(`${config.BASE_URL}trabajador/get`);
    // Accedemos a los datos directamente
    const trabajadores = respuesta.data;
    return trabajadores;
  } catch (error) {
    console.error("Error al obtener los trabajadores:", error);
    throw error;
  }
};

export { obtenerTrabajadores };
