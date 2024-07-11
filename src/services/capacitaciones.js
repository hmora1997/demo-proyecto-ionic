import axios from 'axios';
import config from '../config';



/**
 * 
 * @returns {Promise<Array>} Retorna un array con las capacitaciones
 * 
 */

const obtenerCapacitaciones = async () => {
  try {

    const respuesta = await axios.get(`${config.BASE_URL}capacitacion/get`);
    const capacitaciones = respuesta.data;

    return capacitaciones;
  } catch (error) {
    console.error("Error al obtener las capacitaciones:", error);
    throw error;
  }
};


/**
 * 
 * @param {*} carId 
 * @returns {Promise<Array>} Retorna un array con las capacitaciones por CAR_ID
 * 
 */


const obtenerCapacitacionesPorCarId = async (carId) => {
  try {
    const url = `${config.BASE_URL}cargo_capacitacion/get&cc_car_id=${carId}`;
    const response = await axios.get(url);


    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn('Respuesta inesperada, no es un array:', response.data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los trabajadores por CAR_ID:", error);
    return [];
  }
};

export { obtenerCapacitaciones, obtenerCapacitacionesPorCarId };
