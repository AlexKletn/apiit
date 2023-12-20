import { AxiosError, AxiosInstance } from 'axios';

import { Events } from '@/EventsEmitter';
import type { ResponseOptions, ResponseSuccessful } from '@/ResponseParser';
import { ResponseParser } from '@/ResponseParser';

import type { ProgressEvent, RequestEvents, RequestOptions } from './types';
import RequestFailedException from '@/Request/Exceptions/RequestFailedException';
import { Headers } from '@/Host';

class Request<ResponseType> {
  static create<ResponseType>({
    method, path, payload, responseFormat,
  }: RequestOptions, axios: AxiosInstance) {
    return new Request<ResponseType>({
      method, path, payload, responseFormat,
    }, axios);
  }

  readonly #controller = new AbortController();
  readonly #requestPromise: Promise<ResponseSuccessful<ResponseType>>;

  // eslint-disable-next-line max-len
  readonly #events = new Events<RequestEvents>();

  private constructor({
    method, path, payload, responseFormat,
  }: RequestOptions, axios: AxiosInstance) {
    const emit = this.#events.emit.bind(this.#events);

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
      .then((res) => this.#responseReturn(res as ResponseSuccessful<ResponseType>))
      .catch((err: AxiosError) => {
        this.#events.emit('error', err);

        throw new RequestFailedException({
          code: err.response.status,
          data: err.response.data,

          response: {
            headers: err.response.headers as unknown as Headers,
          },
          request: {
            headers: err.request.headers as unknown as Headers,
            method,
            path,
          },
        });
      });
  }

  async getResult() {
    return this.#requestPromise;
  }

  cancel() {
    this.#controller.abort();
    this.#events.emit('cancel', null);
  }

  on<Payload>(
    event: RequestEvents,
    handler: (event: Payload) => void,
  ) {
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
