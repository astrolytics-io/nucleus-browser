import { safeLocalStorage } from './storage';
import type { DeviceInfo } from './types';

// eslint-disable-next-line import/prefer-default-export
export function getDeviceInfo(): DeviceInfo {
  // this library has side effects and throws errors in some
  // cases e.g. Next.js compilation, so we import at runtime
  // @ts-ignore
  const { ClientJS } = require('clientjs');

  const client = new ClientJS();

  const defaultDeviceInfo = {
    deviceId: null,
    locale: null,
    platform: null,
  };

  const data: DeviceInfo = {
    ...defaultDeviceInfo,
    locale: client.getLanguage(),
  };

  if (safeLocalStorage.getItem('nucleus-dId')) {
    data.deviceId = safeLocalStorage.getItem('nucleus-dId');
  } else {
    data.deviceId = client.getFingerprint().toString();
    safeLocalStorage.setItem('nucleus-dId', data.deviceId);
  }

  let isIpad: boolean;

  try {
    // in some cases navigator might not be available, e.g. Next.js apps using SSR,
    // so to avoid errors at compile time we try/catch it
    isIpad = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 0)
        || navigator.platform === 'iPad';
  } catch (e) {
    isIpad = false;
  }

  data.platform = isIpad ? 'iPadOS' : client.getOS();

  return data;
}
