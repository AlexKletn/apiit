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
  queryParamsKeys: [],
  headers: {},
  pathParamRegex: /:([A-Z0-9_.\-~]+)/i,
};

const URL_REGEXP = /([A-Za-z]{3,9}:(?:\/\/)?(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?)?((?:\/[+~%/.\w\-_:]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?/;

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
    url: string,
    options?: EndpointOptions,
    axiosInstance?: AxiosInstance,
  ) {
    const [, origin, path] = url.match(URL_REGEXP);

    this.#axios = axiosInstance ?? axios.create({
      baseURL: origin,
    });

    this.#path = `${path}`;
    this.#method = `${method}`;
    this.#options = { ...optionsDefaults, ...options };

    if (this.#options.paramsConfig) {
      console.warn('paramsConfig is deprecated');
    }
  }

  request(payload: RequestType = {} as RequestType, headers?: Record<string, HeaderStatic>) {
    const {
      responseFormat,
    } = this.#options;

    const {
      body, query, pathParams,
    } = this.#generatePayload(payload);
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
  #generatePayload(payload: RequestParams) {
    if (this.#options.paramsConfig) {
      const query = this.#getQueryUsingConfig(payload);
      const pathParams = this.#getPathParamsUsingConfig(payload);
      const body = this.#method !== 'get' ? this.#getBodyUsingConfig(payload) : undefined;

      return {
        body,
        query,
        pathParams,
      };
    }

    const parsedPayload = {
      pathParams: undefined,
      query: undefined,
      body: undefined,
    };

    const [pathParams, remainder] = this.#payloadStepOne(payload);
    parsedPayload.pathParams = pathParams;

    if (this.#method === 'get') {
      parsedPayload.query = remainder;
    } else {
      const [query, body] = this.#payloadStepTwo(remainder);
      parsedPayload.query = query;
      parsedPayload.body = body;
    }

    return parsedPayload;
  }

  #payloadStepOne(payload: RequestParams) {
    const { pathParamRegex } = this.#options;
    const pathParamsKeys = this.#path
      .replace(/\?.+/, '')
      .replace(/#.+/, '')
      .split('/')
      .filter((pathSegment) => pathParamRegex.test(pathSegment))
      .map((pathParamKey) => pathParamKey.replace(pathParamRegex, '$1'));

    const remainder = [];
    const pathParams = Object.entries(payload).filter(([key, value]) => {
      const isPathParam = pathParamsKeys.includes(key);

      if (!isPathParam) {
        remainder.push([key, value]);
      }

      return isPathParam;
    });

    return [Object.fromEntries(pathParams), Object.fromEntries(remainder)];
  }

  #payloadStepTwo(payload: RequestParams) {
    const { queryParamsKeys } = this.#options;

    if (queryParamsKeys.length === 0) return [{}, payload];

    const remainder = [];
    const queryParams = Object.entries(payload).filter(([key, value]) => {
      const isQueryParam = queryParamsKeys.includes(key);

      if (!isQueryParam) {
        remainder.push([key, value]);
      }

      return isQueryParam;
    });

    return [Object.fromEntries(queryParams), Object.fromEntries(remainder)];
  }

  /* istanbul ignore next */
  #getBodyUsingConfig(payload: RequestParams) {
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
  #getQueryUsingConfig(payload: RequestParams) {
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

  #getPathParamsUsingConfig(payload: RequestParams) {
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
