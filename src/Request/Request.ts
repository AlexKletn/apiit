import { AxiosError, AxiosInstance } from 'axios';

import { Events } from '@/EventsEmitter';
import type { ResponseOptions, ResponseSuccessful } from '@/ResponseParser';
import { ResponseParser } from '@/ResponseParser';

import type { ProgressEvent, RequestEvents, RequestOptions } from './types';
import RequestFailedException from '@/Request/Exceptions/RequestFailedException';
import { Headers } from '@/Host';

class Request<ResponseType> implements PromiseLike<ResponseSuccessful<ResponseType>> {
  static create<ResponseType>(options: RequestOptions, axios?: AxiosInstance) {
    return new Request<ResponseType>(options, axios);
  }

  readonly #path: string;
  readonly #method: string;

  readonly #controller = new AbortController();
  readonly #requestPromise: Promise<ResponseSuccessful<ResponseType>>;

  readonly #events = new Events<RequestEvents>();

  private constructor({
    method, path, payload = {}, responseFormat = 'json', headers,
  }: RequestOptions, axios: AxiosInstance) {
    const emit = this.#events.emit.bind(this.#events);

    this.#path = path;
    this.#method = method;

    this.#requestPromise = axios
      .request<ResponseType>({
      method: this.#method,
      url: this.#path,
      responseType: responseFormat,
      signal: this.#controller.signal,
      headers,

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
          status: err.response?.status,
          data: err.response?.data,
          code: err.code,

          response: {
            headers: err.response?.headers as unknown as Headers,
          },
          request: {
            headers: err.request.headers as unknown as Headers,
            method,
            path,
          },
        });
      });
  }

  then<
    TResult1 = ResponseSuccessful<ResponseType>,
    TResult2 = never,
  >(
    // eslint-disable-next-line max-len
    onFulfilled?: (value: ResponseSuccessful<ResponseType>) => TResult1 | PromiseLike<TResult1> | undefined | null,
    // eslint-disable-next-line max-len
    onRejected?: (reason: RequestFailedException) => TResult2 | PromiseLike<TResult2> | undefined | null,
  ): PromiseLike<TResult1 | TResult2> {
    return this.#requestPromise.then(onFulfilled, onRejected);
  }

  catch<
    TResult2 = RequestFailedException,
  >(
    // eslint-disable-next-line max-len
    onRejected?: (reason: RequestFailedException) => TResult2 | PromiseLike<TResult2> | undefined | null,
  ): PromiseLike<ResponseSuccessful<ResponseType>> {
    // TODO: Find a better way to
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.#requestPromise.catch(onRejected);
  }

  getResult() {
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
