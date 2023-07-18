declare module 'nucleus-browser' {
  import { Options, Event } from './src/types';

  export default class Nucleus {
    static init(appId: string, options?: Options): void;

    static track(
      name: Event['name'],
      payload: Event['payload'],
    ): void;

    static trackError(name: string, error: Error): void;

    static identify(newId: string, newProps: object | null = null): void;

    static page(name: string, params: object | null = null): void;

    static disableTracking(): void;

    static enableTracking(): void;

    constructor(appId: string, options?: Options);
  }
}
