import axios, { AxiosInstance } from 'axios';
import { Events } from '@/EventsEmitter';
import { Endpoint } from '@/Endpoint';
import type { EndpointOptions } from '@/Endpoint/types';
import type { RequestParams } from '@/Request';

import type {
  HeaderGetter, HeaderStatic, HostEvents, Methods,
} from './types';
import { Headers } from './types';

class Host {
  static create(baseURL: string, headers?: Headers): Host;
  static create(axiosInstance: AxiosInstance, headers?: Headers): Host;
  static create(
    baseURLOrAxios: string | AxiosInstance,
    headers: Headers = {},
  ) {
    const { headersStatic, headersGetters } = Host.parseHeaders(headers);

    if (typeof baseURLOrAxios === 'string') {
      return new Host(axios.create({
        baseURL: baseURLOrAxios,
        headers: headersStatic,
      }), headersGetters);
    }

    if (baseURLOrAxios.interceptors) {
      return new Host(baseURLOrAxios, headersGetters);
    }

    throw new Error(`${baseURLOrAxios} is not allowed for createHost`);
  }

  readonly #events = new Events<HostEvents>();

  readonly #axios: AxiosInstance;

  readonly #headers: Headers;

  private constructor(
    axiosInstance: AxiosInstance,
    headers: Headers = {},
  ) {
    this.#axios = axiosInstance;
    this.#headers = headers;

    this.#applyHeadersGetter();
    this.#setEvents();
  }

  createEndpoint<RequestType extends RequestParams, ResponseType>(
    method: Methods,
    path: string,
    { headers, ...options }: EndpointOptions = {
      dataFormat: 'json',
      responseFormat: 'json',
      headers: {},
    },
  ): Endpoint<RequestType, ResponseType> {
    const preparedHeaders = {
      ...Host.parseHeaders(this.#headers).headersStatic,
      ...headers,
    } as Record<string, HeaderStatic>;

    return Endpoint.create<RequestType, ResponseType>(
      method,
      path,
      { headers: preparedHeaders, ...options },
      this.#axios,
    );
  }

  on(event: HostEvents, handler: (event: Error | Record<string, unknown>) => void) {
    this.#events.on(event, handler);
  }

  off(event: HostEvents, handler: (event: Error | Record<string, unknown>) => void) {
    this.#events.off(event, handler);
  }

  #applyHeadersGetter() {
    const headersGetters = Object.entries(Host.parseHeaders(this.#headers).headersGetters);

    this.#axios.interceptors.request.use((config) => {
      for (let i = 0; i < headersGetters.length; i += 1) {
        const header = headersGetters[i];
        const [key, getter] = header;

        config.headers.set(key, (getter as HeaderGetter)());
      }

      return config;
    });
  }

  #setEvents() {
    this.#axios.interceptors.request.use(
      (config) => {
        this.#events.emit('request', config);

        return config;
      },
      (error) => {
        this.#events.emit('error', error);

        return error;
      },
    );

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

  static parseHeaders(headers: Headers) {
    const headersEntries = Object.entries(headers);

    const headersStatic = Object.fromEntries(
      headersEntries.filter(([, value]) => typeof value === 'string'),
    );

    const headersGetters = Object.fromEntries(
      headersEntries.filter(([, value]) => typeof value === 'function'),
    );

    return {
      headersStatic,
      headersGetters,
    };
  }
}

export default Host;
