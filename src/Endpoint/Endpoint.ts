import { createUrl } from 'url-fns';
import axios, { AxiosInstance } from 'axios';

import type { RequestParams } from '@/Request';
import { Request } from '@/Request';

import type { Methods } from '@/Host';
import { HeaderStatic } from '@/Host';
import type { EndpointOptions } from './types';

const optionsDefaults: EndpointOptions = {
  dataFormat: 'json',
  responseFormat: 'json',
  paramsConfig: {},
  headers: {},
};

class Endpoint<RequestType extends RequestParams, ResponseType> {
  static create<RequestType extends RequestParams, ResponseType>(
    method: Methods,
    path: string,
    options?: EndpointOptions,
    axiosInstance?: AxiosInstance,
  ) {
    return new Endpoint<RequestType, ResponseType>(method, path, options, axiosInstance);
  }

  readonly #axios: AxiosInstance;
  readonly #path: string;
  readonly #method: Methods;
  readonly #options: EndpointOptions;

  private constructor(
    method: Methods,
    path: string,
    options?: EndpointOptions,
    axiosInstance?: AxiosInstance,
  ) {
    this.#axios = axiosInstance ?? axios.create();
    this.#path = path;
    this.#method = method;
    this.#options = { ...optionsDefaults, ...options };
  }

  request(payload: RequestType = {} as RequestType, headers?: Record<string, HeaderStatic>) {
    const {
      responseFormat,
    } = this.#options;

    const {
      body, query, pathParams,
    } = this.#generateParams(payload);
    const url = createUrl({
      path: this.#path,
      pathParams,
    });

    return Request.create<ResponseType>({
      method: this.#method,
      path: url,
      responseFormat,
      payload: {
        data: body,
        params: query,
      },
      headers: {
        ...this.#options.headers,
        ...headers,
      },
    }, this.#axios);
  }

  /* istanbul ignore next */
  #generateParams(payload: RequestParams) {
    const body = this.#generateBody(payload);
    const query = this.#generateQuery(payload);
    const pathParams = this.#generatePathParams(payload);

    return {
      body,
      query,
      pathParams,
    };
  }

  /* istanbul ignore next */
  #generateBody(payload: RequestParams) {
    const {
      dataFormat,
      paramsConfig,
    } = this.#options;

    if (dataFormat === 'string') {
      return payload.body as string;
    }

    const body = {};
    const bodyParamsKeys = Object.entries(paramsConfig)
      .filter(([, config]) => config.in === 'body')
      .map(([key]) => key);

    for (let i = 0; i < bodyParamsKeys.length; i = +1) {
      const bodyParamKey = bodyParamsKeys[i];
      body[bodyParamKey] = payload[bodyParamKey];
    }

    if (dataFormat === 'form-data') {
      const formData = new FormData();
      const bodyKeys = Object.keys(body);

      for (let i = 0; i < bodyKeys.length; i = +1) {
        const bodyKey = bodyKeys[i];
        formData.append(bodyKey, body[bodyKey]);
      }

      return formData;
    }

    return body;
  }

  /* istanbul ignore next */
  #generateQuery(payload: RequestParams) {
    const {
      paramsConfig,
    } = this.#options;

    const query = {};
    const queryParamsKeys = Object.entries(paramsConfig)
      .filter(([, config]) => config.in === 'query')
      .map(([key]) => key);

    for (let i = 0; i < queryParamsKeys.length; i = +1) {
      const bodyParamKey = queryParamsKeys[i];
      query[bodyParamKey] = payload[bodyParamKey];
    }

    return query;
  }

  #generatePathParams(payload: RequestParams) {
    const {
      paramsConfig,
    } = this.#options;

    const path = {};
    const pathParamsKeys = Object.entries(paramsConfig)
      .filter(([, config]) => config.in === 'path')
      .map(([key]) => key);

    for (let i = 0; i < pathParamsKeys.length; i = +1) {
      const bodyParamKey = pathParamsKeys[i];
      path[bodyParamKey] = payload[bodyParamKey];
    }

    return path;
  }
}

export default Endpoint;
