import { describe, expect, test } from '@jest/globals';
import axios from 'axios';
import { Endpoint, EndpointOptions } from '@/Endpoint';
import { Request } from '@/Request';

describe('Endpoint create', () => {
  test('create standalone', () => {
    const endpoint = Endpoint.create('get', '/');

    expect(endpoint).toBeInstanceOf(Endpoint);
  });

  test('with custom axios', () => {
    const endpoint = Endpoint.create('get', '/', {
      dataFormat: 'json', responseFormat: 'json',
    }, axios.create());

    expect(endpoint).toBeInstanceOf(Endpoint);
  });

  test.each([
    {
      responseFormat: 'json',
      dataFormat: 'json',
    },
    {
      responseFormat: 'blob',
      dataFormat: 'json',
    },
    {
      responseFormat: 'text',
      dataFormat: 'string',
    },
    {
      responseFormat: 'text',
      dataFormat: 'form-data',
      headers: {
        foo: 'bar',
      },
    },
  ] as EndpointOptions[])('create endpoint with options: responseFormat=$responseFormat; dataFormat=$dataFormat', (options) => {
    expect(() => Endpoint.create('get', '/', options)).not.toThrow();
  });
});

describe('Endpoint request', () => {
  test('creating', () => {
    const endpoint = Endpoint.create('get', '/');
    const request = endpoint.request();
    request.getResult().catch(() => {});

    expect(request).toBeInstanceOf(Request);
  });
});
