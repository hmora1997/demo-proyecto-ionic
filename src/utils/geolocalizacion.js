// Importa el módulo Geolocation de Capacitor
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

// Función para comprobar y solicitar permisos de ubicación
export async function checkAndRequestPermission() {
    if (Capacitor.isNativePlatform()) {
        const permissions = await Geolocation.checkPermissions();
        if (permissions.location !== 'granted') {
            const permissionResponse = await Geolocation.requestPermissions();
            return permissionResponse.location === 'granted';
        }
        return true; // Permiso ya concedido
    } else {
        // Asumir permiso concedido en el navegador; el navegador solicitará permiso al usar la API
        return true;
    }
}

// Función para obtener la ubicación actual
export async function getCurrentLocation() {
    try {
        // Comprobar y solicitar permiso antes de obtener la ubicación
        const hasPermission = await checkAndRequestPermission();
        if (!hasPermission) {
            throw new Error('Location permission not granted');
        }

        if (Capacitor.isNativePlatform()) {
            // Obtener las coordenadas actuales usando Capacitor en un entorno nativo
            const coordinates = await Geolocation.getCurrentPosition();
            console.log('Current position:', coordinates);
            return coordinates;
        } else {
            // Obtener las coordenadas actuales usando la API de Geolocalización de HTML5 en el navegador
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
            })
            .then(position => {
                console.log('Current position (Web):', position);
                return position;
            })
            .catch(e => {
                console.error('Error getting location (Web)', e);
                throw e;  // Re-throw para manejar el error en el llamador
            });
        }
    } catch (e) {
        console.error('Error getting location', e);
        return null; // O manejar de otra manera dependiendo de tu aplicación
    }
}
