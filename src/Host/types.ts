export type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete' | string;
export type DataFormat = 'json' | 'form-data' | 'string';
export type ResponseFormat = 'json' | 'blob' | 'text';
export type HostEvents = 'error' | 'request' | 'success';

export type HeaderStatic = string | number;
export type HeaderGetter = () => string | number;

export type Headers = Record<string, HeaderStatic | HeaderGetter>;
