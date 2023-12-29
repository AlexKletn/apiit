import { describe, expect, test } from '@jest/globals';
import axios from 'axios';
import { MockServer } from 'jest-mock-server';
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
    {
      responseFormat: 'text',
      dataFormat: 'form-data',
      headers: {
        foo: 'bar',
      },
      queryParamsKeys: ['bar'],
    },
  ] as EndpointOptions[])('create endpoint with options: responseFormat=$responseFormat; dataFormat=$dataFormat', (options) => {
    expect(() => Endpoint.create('get', '/', options)).not.toThrow();
  });
});

describe('Endpoint request', () => {
  const server = new MockServer();
  const data = {
    foo: 'bar',
  };
  const params = {
    id: '69',
  };
  const query = {
    xQuery: '69',
  };

  beforeAll(async () => {
    await server.start();
  });
  afterAll(async () => {
    await server.stop();
  });
  beforeEach(() => {
    server.reset();
  });

  test('creating', () => {
    const endpoint = Endpoint.create('get', '/');
    const request = endpoint.request();
    request.getResult().catch(() => {});

    expect(request).toBeInstanceOf(Request);
  });

  test('parsing params using paramsConfig [get method]', async () => {
    server.get('/req/:id')
      .mockImplementationOnce((ctx) => {
        ctx.status = 200;

        ctx.body = {
          query: ctx.request.query,
          params: ctx.params,
        };
      });

    const endpoint = Endpoint.create('get', `${server.getURL().href}req/:id`, {
      paramsConfig: {
        id: { in: 'path' },
        xQuery: { in: 'query' },
      },
    });

    const request = endpoint.request({
      ...data, ...params, ...query,
    });

    await request.getResult().then((response) => {
      expect(response.data).toMatchObject({ params, query });
    });
  });

  test('parsing params using paramsConfig [post method]', async () => {
    server.post('/req/:id')
      .mockImplementationOnce((ctx) => {
        ctx.status = 200;

        ctx.body = {
          data: ctx.request.body,
          query: ctx.request.query,
          params: ctx.params,
        };
      });

    const endpoint = Endpoint.create('post', `${server.getURL().href}req/:id`, {
      paramsConfig: {
        id: { in: 'path' },
        foo: { in: 'body' },
        xQuery: { in: 'query' },
      },
    });

    const request = endpoint.request({
      ...data, ...params, ...query,
    });

    await request.getResult().then((response) => {
      expect(response.data).toMatchObject({ params, query });
    });
  });

  test('parsing params [get method]', async () => {
    server.get('/req/:id')
      .mockImplementationOnce((ctx) => {
        ctx.status = 200;

        ctx.body = {
          query: ctx.request.query,
          params: ctx.params,
        };
      });

    const endpoint = Endpoint.create('get', `${server.getURL().href}req/:id`, {
      queryParamsKeys: ['xQuery'],
    });

    const request = endpoint.request({
      ...data, ...params, ...query,
    });

    await request.getResult().then((response) => {
      expect(response.data).toMatchObject({ params, query });
    });
  });

  test('parsing params [post method]', async () => {
    server.post('/req/:id')
      .mockImplementationOnce((ctx) => {
        ctx.status = 200;

        ctx.body = {
          data: ctx.request.body,
          query: ctx.request.query,
          params: ctx.params,
        };
      });

    const endpoint = Endpoint.create('post', `${server.getURL().href}req/:id`, {
      queryParamsKeys: ['xQuery'],
    });

    const request = endpoint.request({
      ...data, ...params, ...query,
    });

    await request.getResult().then((response) => {
      expect(response.data).toMatchObject({ params, query });
    });
  });
});
