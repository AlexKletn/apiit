import { AxiosInstance } from 'axios';

import { Events } from '@/EventsEmitter';
import type { Response, ResponseOptions, ResponseSuccessful } from '@/ResponseParser';
import { ResponseParser } from '@/ResponseParser';

import type { ProgressEvent, RequestEvents, RequestOptions } from './types';

class Request<ResponseType> {
  readonly #controller = new AbortController();
  readonly #requestPromise: Promise<Response<ResponseType>>;

  // eslint-disable-next-line max-len
  readonly #events = new Events<RequestEvents>();

  constructor({
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
      .catch((err: Error) => {
        this.#events.emit('error', err);

        return { error: err };
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
