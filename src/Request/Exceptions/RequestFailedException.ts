import { Headers, Methods } from '@/Host';

interface RequestFailedExceptionOptions {
  code: number;
  data: unknown;

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
  code: number;
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
    code, data, response, request,
  }: RequestFailedExceptionOptions) {
    super(`Request error with code ${code}`);

    this.code = code;
    this.data = data;
    this.response = response;
    this.request = request;
  }
}

export default RequestFailedException;
