import { DataFormat, ResponseFormat } from '@/Host/types';

export interface ParamsConfig {
  [key: string]: {
    in: 'body' | 'query' | 'path' | 'header'
  }
}
export interface EndpointOptions {
  dataFormat?: DataFormat;
  responseFormat?: ResponseFormat;

  paramsConfig?: ParamsConfig
}
