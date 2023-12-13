import axios, { AxiosInstance } from 'axios';
import { Endpoint } from '@/Endpoint';
import type { EndpointOptions } from '@/Endpoint/types';
import type { RequestParams } from '@/Request';

import type { HostEvents, Methods } from './types';
import { Events } from '@/Events';

class Host {
  readonly #events = new Events<HostEvents>();

  static getHeaders(headers: Record<string, string | (() => string)>) {
    const headersEntries = Object.entries(headers);

    const headersStatic = Object.fromEntries(
      headersEntries.filter(([, value]) => typeof value === 'string'),
    );

    const headersGetters = headersEntries.filter(([, value]) => typeof value === 'function');

    return {
      headersStatic,
      headersGetters,
    };
  }

  readonly #axios: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string | (() => string)> = {}) {
    const { headersStatic } = Host.getHeaders(headers);

    this.#axios = axios.create({
      baseURL,
      headers: headersStatic,
    });

    this.#applyHeadersGetter(headers);
    this.#setEvents();
  }

  createEndpoint<RequestType extends RequestParams, ResponseType>(
    method: Methods,
    path: string,
    options: EndpointOptions = {
      dataFormat: 'json',
      responseFormat: 'json',
    },
  ): Endpoint<RequestType, ResponseType> {
    return new Endpoint<RequestType, ResponseType>(this.#axios, method, path, options);
  }

  on(event: HostEvents, handler: (event: Error | Record<string, unknown>) => void) {
    this.#events.on(event, handler);
  }

  off(event: HostEvents, handler: (event: Error | Record<string, unknown>) => void) {
    this.#events.off(event, handler);
  }

  #applyHeadersGetter(headers: Record<string, string | (() => string)>) {
    const { headersGetters } = Host.getHeaders(headers);

    this.#axios.interceptors.request.use((config) => {
      for (let i = 0; i < headersGetters.length; i += 1) {
        const header = headersGetters[i];
        const [key, getter] = header;

        config.headers.set(key, (getter as () => string)());
      }

      return config;
    });
  }

  #setEvents() {
    this.#axios.interceptors.request.use((config) => {
      this.#events.emit('request', config);

      return config;
    });

    this.#axios.interceptors.response.use(
      (response) => {
        this.#events.emit('success', response);

        return response;
      },
      (error) => {
        this.#events.emit('error', error);

        return error;
      },
    );
  }
}

export default Host;
