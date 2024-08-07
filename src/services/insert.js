import axios from 'axios';
import config from '../config';

export const enviarSolicitudes = async (
  trabajadores,
  insumosSeleccionados,
  motivo,
  idBodega,
  idUsuario,
  deviceId,
  location,
  firmas,
  firmaSupervisor
) => {
  const url = `${config.BASE_URL}solicitud/insert`;

  const safeDeviceId = deviceId || "default_device_id";
  const latitude = location?.coords?.latitude || "";
  const longitude = location?.coords?.longitude || "";
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  trabajadores.forEach((trabajador, indexT) => {
    insumosSeleccionados.forEach((insumo, indexI) => {
      const firmaTrabajador = firmas[trabajador.tra_id] || "";

      console.log('Enviando firma para trabajador:', trabajador.tra_id, 'Firma:', firmaTrabajador);
      console.log('Firma del supervisor:', firmaSupervisor);

      const formData = new FormData();
      formData.append('sol_android', safeDeviceId);
      formData.append('sol_geo_x', latitude);
      formData.append('sol_geo_y', longitude);
      formData.append('sol_fecha_solicitud', formattedDate);
      formData.append('sol_fecha_entrega', formattedDate);
      formData.append('sol_cantidad', insumo.cantidad);
      formData.append('sol_talla', insumo.epp_talla || '');
      formData.append('sol_estado', "CL");
      formData.append('sol_usu_id', idUsuario);
      formData.append('sol_tra_id', trabajador.tra_id);
      formData.append('sol_epp_id', insumo.epp_id);
      formData.append('sol_motivo', motivo);
      formData.append('sol_bod_id', idBodega);
      formData.append('sol_tra_firma', firmaTrabajador);
      formData.append('sol_supervisor_firma', firmaSupervisor);

      console.log('FormData:', Object.fromEntries(formData.entries()));

      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => console.log(`Solicitud enviada correctamente para trabajador ${indexT + 1} e insumo ${indexI + 1}:`, response.data))
        .catch(error => {
          console.error('Error al enviar la solicitud:', error);
          console.error(`Datos de la solicitud con error: Trabajador ID ${trabajador.tra_id}, Insumo ID ${insumo.epp_id}`);
        });
    });
  });
};


export const enviarCapacitaciones = async (
  trabajadores,
  capacitacionesSeleccionadas,
  motivo,
  idUsuario,
  deviceId,
  location,
  firmas,
  firmaSupervisor
) => {
  const url = `${config.BASE_URL}solicitud_capacitacion/insert`;

  const safeDeviceId = deviceId || "default_device_id";
  const latitude = location?.coords?.latitude || "";
  const longitude = location?.coords?.longitude || "";
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  trabajadores.forEach((trabajador, indexT) => {
    capacitacionesSeleccionadas.forEach((capacitacion, indexI) => {
      const firmaTrabajador = firmas[trabajador.tra_id] || "";

      console.log('Enviando firma para trabajador:', trabajador.tra_id, 'Firma:', firmaTrabajador);
      console.log('Firma del supervisor:', firmaSupervisor);

      const formData = new FormData();
      formData.append('sca_android', safeDeviceId);
      formData.append('sca_geo_x', latitude);
      formData.append('sca_geo_y', longitude);
      formData.append('sca_fecha_solicitud', formattedDate);
      formData.append('sca_fecha_entrega', formattedDate);
      formData.append('sca_motivo', motivo);
      formData.append('sca_anulada', "");
      formData.append('sca_estado', "CL");
      formData.append('sca_usu_id', idUsuario);
      formData.append('sca_tra_id', trabajador.tra_id);
      formData.append('sca_cap_id', capacitacion.cap_id);
      formData.append('sca_tra_firma', firmaTrabajador);
      formData.append('sca_supervisor_firma', firmaSupervisor);

      console.log('FormData:', Object.fromEntries(formData.entries()));

      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => console.log(`Solicitud enviada correctamente para trabajador ${indexT + 1} y capacitacion ${indexI + 1}:`, response.data))
        .catch(error => {
          console.error('Error al enviar la solicitud:', error);
          console.error(`Datos de la solicitud con error: Trabajador ID ${trabajador.tra_id}, CAPACITACION ID ${capacitacion.cap_id}`);
        });
    });
  });
};

