import { AxiosInstance } from 'axios';

import type { Response, ResponseOptions } from '@/ResponseParser';
import { ResponseParser } from '@/ResponseParser';

import type { RequestEvents, RequestOptions } from '@/Request';
import { Events } from '@/Events';

class Request<ResponseType> {
  readonly #controller = new AbortController();
  readonly #requestPromise: Promise<Response<ResponseType> | void>;

  // eslint-disable-next-line max-len
  readonly #events = new Events<RequestEvents, ProgressEvent | ResponseOptions<ResponseType> | Error>();

  constructor({
    method, path, payload, responseFormat,
  }: RequestOptions, axios: AxiosInstance) {
    const emit = this.#events.emit.bind(this);

    this.#requestPromise = axios
      .request<ResponseType>({
      method,
      url: path,
      responseType: responseFormat,
      signal: this.#controller.signal,

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
      .then((res) => this.#responseReturn(res))
      .catch((err) => {
        this.#events.emit('error', err);
      });
  }

  async getResult() {
    return this.#requestPromise;
  }

  cancel() {
    this.#controller.abort();
    this.#events.emit('cancel', null);
  }

  on(event: RequestEvents, handler: (event: ProgressEvent) => void) {
    this.#events.on(event, handler);
  }

  off(event: RequestEvents, handler: (event: ProgressEvent) => void) {
    this.#events.off(event, handler);
  }

  #responseReturn(options: ResponseOptions<ResponseType>) {
    const response = ResponseParser.parse<ResponseType>(options);
    this.#events.emit('load', response);

    return response;
  }
}

export default Request;
