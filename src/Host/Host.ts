import axios, { AxiosInstance } from 'axios';
import { Events } from '@/EventsEmitter';
import { Endpoint } from '@/Endpoint';
import type { EndpointOptions } from '@/Endpoint/types';
import type { RequestParams } from '@/Request';

import type { HostEvents, Methods } from './types';

class Host {
  static create(baseURL: string, headers?: Record<string, string | (() => string)>): Host;
  static create(axiosInstance: AxiosInstance, headers?: Record<string, () => string>): Host;
  static create(
    baseURLOrAxios: string | AxiosInstance,
    headers: Record<string, string | (() => string)>,
  ) {
    const { headersStatic } = Host.getHeaders(headers);

    if (typeof baseURLOrAxios === 'string') {
      return new Host(axios.create({
        baseURL: baseURLOrAxios,
        headers: headersStatic,
      }), headers);
    }

    if (baseURLOrAxios instanceof axios) {
      return new Host(baseURLOrAxios, headers);
    }

    throw new Error(`${baseURLOrAxios} is not allowed for createHost`);
  }

  readonly #events = new Events<HostEvents>();

  readonly #axios: AxiosInstance;

  private constructor(
    axiosInstance: AxiosInstance,
    headers: Record<string, string | (() => string)> = {},
  ) {
    this.#axios = axiosInstance;

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
    return Endpoint.create<RequestType, ResponseType>(this.#axios, method, path, options);
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
}

export default Host;
