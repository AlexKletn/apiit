import { Methods, ResponseFormat } from '@/Host/types';

export interface RequestParams {
  [key: string]: any
}

export interface RequestOptions {
  responseFormat: ResponseFormat;
  method: Methods;
  path: string;
  payload: {
    data: FormData | Record<string, any> | string,
    params: Record<string, any>
  }
}

export interface ProgressEvent {
  loaded: number;
  total?: number;
  progress?: number;
  bytes: number;
  rate?: number;
  estimated?: number;
  upload?: boolean;
  download?: boolean;
}

export type RequestEvents = 'progress:download' | 'progress:upload' | 'progress';
