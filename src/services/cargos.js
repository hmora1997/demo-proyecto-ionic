import axios from 'axios';
import config from '../config';


/**
 *  Obtiene los cargos disponibles. 
 * @returns {Promise<Array>} Un array con los cargos disponibles.
  
 */

export const obtenerCargos = async () => {
  try {

    const respuesta = await axios.get(`${config.BASE_URL}cargo/get`);
    const cargos = respuesta.data;

    return cargos;
  } catch (error) {
    console.error("Error al obtener los cargos:", error);
    throw error;
  }
};


/**
 * 
 * @returns {Promise<Array>} Retorna un array con los cargos de capacitacion
 * 
 */

export const obtenerCargosCapacitaciones = async () => {
  try {

    const respuesta = await axios.get(`${config.BASE_URL}cargo_capacitacion/get`);
    const cargos = respuesta.data;

    return cargos;
  } catch (error) {
    console.error("Error al obtener los cargos:", error);
    throw error;
  }
};
