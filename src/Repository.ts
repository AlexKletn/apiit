import { Host } from '@/Host';

const createHost = (
  baseURL: string,
  headers?: Record<string, string | (() => string)>,
) => new Host(baseURL, headers);

export {
  createHost,
};
