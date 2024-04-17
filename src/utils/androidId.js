
import { Device } from '@capacitor/device';

export async function getDeviceInfo() {
    const info = await Device.getId();
    console.log('UUID del dispositivo:', info.uuid);
    return info.uuid; // Este es el UUID del dispositivo, que puedes usar como un identificador único.
}