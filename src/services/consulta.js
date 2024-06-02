import axios from 'axios';
import config from '../config';

/**
 * Realiza una consulta a diferentes endpoints con parámetros opcionales.
 * 
 * @param {string} tipoConsulta El tipo de consulta a realizar, ej. 'epp_entregado', 'trabajadores_vencidos', etc.
 * @param {Object} parametros Opciones adicionales para filtrar la consulta, ej. { epp_id: 1, tra_rut: '12345678-9' }
 */
export const realizarConsulta = async (tipoConsulta, parametros = {}) => {
    try {
        const urlParams = new URLSearchParams();
        for (const key in parametros) {
            if (parametros[key]) {
                urlParams.append(key, parametros[key]);
            }
        }
        const url = `${config.BASE_URL}${tipoConsulta}/get&${urlParams.toString()}`;
        const respuesta = await axios.get(url);
        return respuesta.data;
    } catch (error) {
        console.error(`Error al obtener datos para ${tipoConsulta}:`, error);
        throw error;
    }
};


export const obtenerReciboUrl = (sol_id) => {
    return `${config.PDF_URL}sol_id=${sol_id}`;
}
