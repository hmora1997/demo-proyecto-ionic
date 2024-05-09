import axios from 'axios';
import config from '../config';

const obtenerTrabajadores = async () => {
  try {
    const respuesta = await axios.get(`${config.BASE_URL}trabajador/get`);
    const trabajadores = respuesta.data;
    return trabajadores;
  } catch (error) {
    console.error("Error al obtener los trabajadores:", error);
    throw error;
  }
};

const obtenerTrabajadoresPorCarId = async (carId) => {
  try {
    const url = `${config.BASE_URL}trabajador/get&tra_car_id=${carId}`;
    const response = await axios.get(url);
    console.log("Respuesta obtenida:", response.data);

    if (response.data && Array.isArray(response.data)) {
      return response.data; // Asegúrate de que siempre es un array
    } else {
      console.warn('Respuesta inesperada, no es un array:', response.data);
      return []; // Devuelve un arreglo vacío si la respuesta no es un arreglo
    }
  } catch (error) {
    console.error("Error al obtener los trabajadores por CAR_ID:", error);
    return []; // Devuelve un arreglo vacío en caso de error
  }
};



export { obtenerTrabajadores, obtenerTrabajadoresPorCarId };
