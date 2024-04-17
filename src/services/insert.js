import axios from 'axios';
import config from '../config';

export const enviarSolicitudes = async (trabajadores, insumosSeleccionados, motivo, idBodega, idUsuario, deviceId = "unknown_device_id", location) => {
  const url = `${config.BASE_URL}solicitud/insert`;
  const formattedDate = new Date().toISOString();

  // Valores predeterminados seguros en caso de que location o deviceId sean undefined
  const safeDeviceId = deviceId || "default_device_id";
  const latitude = location?.coords?.latitude || "";
  const longitude = location?.coords?.longitude || "";

  trabajadores.forEach((trabajador, indexT) => {
    insumosSeleccionados.forEach((insumo, indexI) => {
      const formData = new FormData();
      formData.append('SOL_ANDROID', safeDeviceId);
      formData.append('SOL_GEO_X', latitude);
      formData.append('SOL_GEO_Y', longitude);
      formData.append('SOL_FECHA_SOLICITUD', formattedDate);
      formData.append('SOL_CANTIDAD', insumo.cantidad);
      formData.append('SOL_TALLA', insumo.EPP_TALLA || '');
      formData.append('SOL_ESTADO', 1);
      formData.append('SOL_USU_ID', idUsuario);
      formData.append('SOL_TRA_ID', trabajador.TRA_ID);
      formData.append('SOL_EPP_ID', insumo.EPP_ID);
      formData.append('SOL_FECHA_ENTREGA', formattedDate);
      formData.append('SOL_MOTIVO', motivo);
      formData.append('SOL_BOD_ID', idBodega);

      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => console.log(`Solicitud enviada correctamente para trabajador ${indexT + 1} e insumo ${indexI + 1}:`, response.data))
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
        console.error(`Datos de la solicitud con error: Trabajador ID ${trabajador.TRA_ID}, Insumo ID ${insumo.EPP_ID}`);
      });
    });
  });
};
