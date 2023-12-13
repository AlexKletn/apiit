import axios, { AxiosInstance } from 'axios';

import { Endpoint } from '@/Endpoint';
import type { EndpointOptions } from '@/Endpoint/types';
import type { RequestParams } from '@/Request';

import type { Methods } from './types';

class Host {
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
}

export default Host;
