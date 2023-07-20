import { getDeviceInfo } from './device';
import { safeLocalStorage } from './storage';
import type { Store } from './types';
import { generateNumId, generateStrId } from './utils';

function getInitialStore(): Store {
  return {
    appId: safeLocalStorage.getItem('nucleus-appId') ?? null,
    queue: JSON.parse(safeLocalStorage.getItem('nucleus-queue') || '[]'),
    props: JSON.parse(safeLocalStorage.getItem('nucleus-props') || '{}'),
    userId: safeLocalStorage.getItem('nucleus-userId') ?? null,
    anonId: safeLocalStorage.getItem('nucleus-anonId') ?? generateStrId(12),
    device: JSON.parse(safeLocalStorage.getItem('nucleus-device') || 'null') ?? getDeviceInfo(),
    sessionId: safeLocalStorage.getItem('nucleus-sessionId') ?? generateNumId(),
    lastActive: JSON.parse(safeLocalStorage.getItem('nucleus-lastActive') || 'null') ?? Date.now(),
    initialized: JSON.parse(safeLocalStorage.getItem('nucleus-initialized') || 'false'),
    client: 'browser',
    moduleVersion: __VERSION__,
  };
}

const stored: Store = getInitialStore();

const store = new Proxy(stored, {
  get(target: Store, prop: keyof Store) {
    const value = Reflect.get(target, prop);
    if (value != null) return value; // value in memory

    const localStorageValue = safeLocalStorage.getItem(`nucleus-${String(prop)}`);
    if (localStorageValue !== null && typeof localStorageValue === 'string') {
      const parsedValue = JSON.parse(localStorageValue);
      // @ts-expect-error: this is fine
      target[prop] = parsedValue;
      return parsedValue;
    }

    return getInitialStore()[prop];
  },
  set(target: Store, prop: keyof Store, value: unknown) {
    // @ts-expect-error: this is fine
    target[prop] = value;
    safeLocalStorage.setItem(`nucleus-${String(prop)}`, JSON.stringify(value));
    return true;
  },
});

export default store;
