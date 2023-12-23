import { Headers, Methods } from '@/Host';

interface RequestFailedExceptionOptions {
  status: number;
  data: unknown;
  code: string;
  isCanceled?: boolean;

  response: {
    headers: Headers;
  }

  request: {
    method: Methods,
    path: string,
    headers: Headers,
  }
}

class RequestFailedException extends Error {
  status: number;
  code: string;
  data: unknown;
  response: {
    headers: Headers;
  };

  request: {
    method: Methods,
    path: string,
    headers: Headers,
  };

  constructor({
    status, data, response, request, code,
  }: RequestFailedExceptionOptions) {
    super(`Request error with code ${status}`);

    this.status = status;
    this.code = code;
    this.data = data;
    this.response = response;
    this.request = request;
  }

  get isCanceled() {
    return this.code === 'ERR_CANCELED';
  }
}

export default RequestFailedException;
