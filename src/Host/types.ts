export type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete' | string;
export type DataFormat = 'json' | 'form-data' | 'string';
export type ResponseFormat = 'json' | 'blob' | 'text';
export type HostEvents = 'error' | 'request' | 'success';

export type Headers = Record<string, string | (() => string)>;
