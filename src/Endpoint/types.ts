import { DataFormat, HeaderStatic, ResponseFormat } from '@/Host/types';

export type ParamsConfig = Record<string, {
  in: 'body' | 'query' | 'path' | 'header'
}>;

export interface EndpointOptions {
  dataFormat?: DataFormat;
  responseFormat?: ResponseFormat;
  paramsConfig?: ParamsConfig;
  headers?: Record<string, HeaderStatic>,
}
