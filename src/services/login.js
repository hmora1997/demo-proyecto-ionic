// authService.js
import axios from 'axios';
import config from '../config';

export const login = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append('usu_nombre', username);
    formData.append('usu_contrasena', password);
    const response = await axios.post(`${config.BASE_URL}usuario/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
};
