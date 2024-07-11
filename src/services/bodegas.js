import axios from 'axios';
import config from '../config';


/**
 * 
 * @returns {Promise<Array>} Retorna un array con las bodegas
 *
 */

const obtenerBodegas = async () => {
  try {
    const respuesta = await axios.get(`${config.BASE_URL}bodega/get`);
    const bodegas = respuesta.data;
    return bodegas;
  } catch (error) {
    console.error('Error al obtener las bodegas:', error);
    throw error;
  }
};

export { obtenerBodegas };
