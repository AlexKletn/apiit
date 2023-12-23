import {
  describe, expect, jest, test,
} from '@jest/globals';
import { MockServer } from 'jest-mock-server';
import axios from 'axios';
import { Host } from '@/Host';
import { Endpoint, EndpointOptions } from '@/Endpoint';

describe('Create host', () => {
  test('with headers', () => {
    const host = Host.create('/api', {
      'header-1': () => 'header 1',
      'header-2': 'header 2',
    });

    expect(host).toBeInstanceOf(Host);
  });
  test('without headers', () => {
    const host = Host.create('/api');

    expect(host).toBeInstanceOf(Host);
  });
  test('use axios instance', () => {
    const axiosInstance = axios.create();

    const host = Host.create(axiosInstance);

    expect(host).toBeInstanceOf(Host);
  });
  test('error with create, use not string and not axios', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(() => Host.create({})).toThrow(Error);
  });
});

describe('events', () => {
  const mockServer = new MockServer();
  let eventHandlers;
  let host: Host;

  beforeAll(async () => {
    await mockServer.start();
  });
  afterAll(async () => { await mockServer.stop(); });

  beforeEach(async () => {
    mockServer.reset();

    eventHandlers = {
      handler: () => {},
    };
    host = Host.create(mockServer.getURL().toString());
  });

  test('error event', async () => {
    const eventHandingCallings = jest.spyOn(eventHandlers, 'handler');
    host.on('error', () => eventHandlers.handler());

    await host.createEndpoint('get', 'ds').request().getResult();

    expect(eventHandingCallings).toBeCalled();
  });
  test('request event', async () => {
    const eventHandingCallings = jest.spyOn(eventHandlers, 'handler');
    host.on('request', () => eventHandlers.handler());

    await host.createEndpoint('get', 'ds').request().getResult();

    expect(eventHandingCallings).toBeCalled();
  });
  test('success event', async () => {
    const eventHandingCallings = jest.spyOn(eventHandlers, 'handler');

    mockServer.get('/test')
      .mockImplementationOnce((ctx) => {
        ctx.status = 200;
      })
      .mockImplementationOnce((ctx) => {
        ctx.status = 201;
      });

    host.on('success', () => {
      eventHandlers.handler();
    });

    await host.createEndpoint('get', 'test').request().getResult();

    expect(eventHandingCallings).toBeCalled();
  });

  test('events off', async () => {
    const eventHandingCallings = jest.spyOn(eventHandlers, 'handler');
    const handler = () => eventHandlers.handler();
    host.on('request', handler);
    host.off('request', handler);

    await host.createEndpoint('get', 'ds').request().getResult();

    expect(eventHandingCallings).not.toBeCalled();
  });
});

describe('endpoint creating', () => {
  let host: Host;

  beforeEach(() => {
    host = Host.create('/');
  });

  test.each([
    {
      method: 'get',
    },
    {
      method: 'post',
    },
    {
      method: 'put',
    },
    {
      method: 'delete',
    },
  ])('create endpoint $method', ({ method }) => {
    const endpoint = host.createEndpoint(method, 'test');

    expect(endpoint).toBeInstanceOf(Endpoint);
  });

  test.each(
    [
      {
        dataFormat: 'json',
        responseFormat: 'json',
      },
      {
        dataFormat: 'form-data',
        responseFormat: 'json',
      },
      {
        dataFormat: 'string',
        responseFormat: 'blob',
      },
      {
        dataFormat: 'json',
        responseFormat: 'text',
      },
    ] as EndpointOptions[],
  )('create with (dataFormat: $dataFormat, responseFormat: $responseFormat)', ({ dataFormat, responseFormat }) => {
    const endpoint = host.createEndpoint('get', 'test', { dataFormat, responseFormat });

    expect(endpoint).toBeInstanceOf(Endpoint);
  });

  test('create with headers', () => {
    const endpoint = host.createEndpoint('get', 'test', {
      headers: {
        a: 'fsd',
      },
    });

    expect(endpoint).toBeInstanceOf(Endpoint);
  });
});

describe('static methods', () => {
  test('parseHeaders', () => {
    const getters = {
      Test: () => 'afdasf',
      Foo: () => 'bar',
    };

    const statics = {
      Auth: 'Barear',
    };

    const { headersGetters, headersStatic } = Host.parseHeaders({ ...getters, ...statics });

    expect(headersStatic).toMatchObject(statics);
    expect(headersGetters).toMatchObject(getters);
  });
});
