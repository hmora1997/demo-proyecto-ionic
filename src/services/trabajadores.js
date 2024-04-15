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
    const url = `${config.BASE_URL}trabajador/get?TRA_CAR_ID=${carId}`;
    const response = await axios.get(url);
    console.log("Respuesta obtenida:", response.data); // Depuración: ver la respuesta real de la API
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn('Respuesta inesperada o no es un array:', response.data);
      return []; 
    }
  } catch (error) {
    console.error("Error al obtener los trabajadores por CAR_ID:", error);
    return []; 
  }
};



export { obtenerTrabajadores, obtenerTrabajadoresPorCarId };
