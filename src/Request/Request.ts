import { AxiosInstance } from 'axios';
import mitt from 'mitt';

import type { Response } from '@/ResponseParser';
import { ResponseParser } from '@/ResponseParser';

import type { RequestEvents, RequestOptions } from '@/Request';

class Request<ResponseType> {
  #emitter = mitt();
  #requestPromise: Promise<Response<ResponseType>>;

  constructor({
    method, path, payload, responseFormat,
  }: RequestOptions, axios: AxiosInstance) {
    const emit = this.#emit.bind(this);

    this.#requestPromise = axios
      .request<ResponseType>({
      method,
      url: path,
      responseType: responseFormat,

      ...payload,

      onUploadProgress(e) {
        emit('progress:upload', e);
        emit('progress', e);
      },
      onDownloadProgress(e) {
        emit('progress:download', e);
        emit('progress', e);
      },
    })
      .then(({ data, headers }) => ResponseParser.parse<ResponseType>({
        data,
        headers,
      }));
  }

  async getResult() {
    return this.#requestPromise;
  }

  on(event: RequestEvents, handler: (event: ProgressEvent) => void) {
    this.#emitter.on(event, handler);
  }

  off(event: RequestEvents, handler: (event: ProgressEvent) => void) {
    this.#emitter.off(event, handler);
  }

  #emit(event: RequestEvents, payload: ProgressEvent) {
    this.#emitter.emit(event, payload);
  }
}

export default Request;
