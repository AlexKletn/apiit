import { DataFormat, HeaderStatic, ResponseFormat } from '@/Host/types';

export type ParamsConfig = Record<string, {
  in: 'body' | 'query' | 'path'
}>;

export interface EndpointOptions {
  dataFormat?: DataFormat;
  responseFormat?: ResponseFormat;
  queryParamsKeys?: string[];
  headers?: Record<string, HeaderStatic>;
  // @deprecated
  paramsConfig?: ParamsConfig;
  pathParamRegex?: RegExp
}
