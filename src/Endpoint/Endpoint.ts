import { createUrl } from 'url-fns';
import axios, { AxiosInstance } from 'axios';

import type { RequestParams } from '@/Request';
import { Request } from '@/Request';

import type { DataFormat, Methods } from '@/Host';
import type { EndpointOptions, ParamsConfig } from './types';

class Endpoint<RequestType extends RequestParams, ResponseType> {
  static create<RequestType extends RequestParams, ResponseType>(
    method: Methods,
    path: string,
    options: EndpointOptions,
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
    options: EndpointOptions = {
      dataFormat: 'json',
      responseFormat: 'json',
    },
    axiosInstance?: AxiosInstance,
  ) {
    this.#axios = axiosInstance ?? axios.create();
    this.#path = path;
    this.#method = method;
    this.#options = options;
  }

  request(payload?: RequestType) {
    const {
      dataFormat,
      responseFormat,
      paramsConfig,
    } = this.#options;

    const { body, query, pathParams } = Endpoint.generateParams(payload, dataFormat, paramsConfig);
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
    }, this.#axios);
  }

  static generateParams(
    payload: RequestParams = {},
    dataFormat: DataFormat = 'json',
    paramsConfig: ParamsConfig = {},
  ) {
    const body = Endpoint.generateBody(payload, paramsConfig, dataFormat);
    const query = Endpoint.generateQuery(payload, paramsConfig);
    const pathParams = Endpoint.generatePathParams(payload, paramsConfig);

    return {
      body,
      query,
      pathParams,
    };
  }

  static generateBody(payload: RequestParams, paramsConfig: ParamsConfig, dataFormat: DataFormat = 'json') {
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

  static generateQuery(payload: RequestParams, paramsConfig: ParamsConfig) {
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

  static generatePathParams(payload: RequestParams, paramsConfig: ParamsConfig) {
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
