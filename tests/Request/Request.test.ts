import {
  describe, expect, jest, test,
} from '@jest/globals';
import axios from 'axios';
import { MockServer } from 'jest-mock-server';
import { Request } from '@/Request';
import RequestFailedException from '@/Request/Exceptions/RequestFailedException';

describe('Request', () => {
  test('create', () => {
    expect(() => Request.create({
      method: 'get',
      path: 'test',
    }, axios.create()).getResult().catch(() => {})).not.toThrow();
  });
});

describe('Send request', () => {
  const server = new MockServer();

  beforeAll(async () => {
    await server.start();
  });
  afterAll(async () => {
    await server.stop();
  });
  beforeEach(() => {
    server.reset();
  });

  test('success', async () => {
    server.get('/success')
      .mockImplementationOnce((ctx) => {
        ctx.status = 200;
      });

    const request = Request.create({
      method: 'get',
      path: 'success',
    }, axios.create({ baseURL: server.getURL().href }));

    await expect(request.getResult()).resolves.not.toBeNull();
  });

  test('success then', async () => {
    server.get('/success')
      .mockImplementationOnce((ctx) => {
        ctx.status = 200;
      });

    const request = Request.create({
      method: 'get',
      path: 'success',
    }, axios.create({ baseURL: server.getURL().href }));

    await expect(request).resolves.not.toBeNull();
  });

  test('with payload (data and query params)', async () => {
    const data = {
      foo: 'bar',
    };
    const params = {
      id: '69',
    };

    server.get('/su')
      .mockImplementationOnce((ctx) => {
        ctx.status = 200;
        ctx.body = {
          data: ctx.request.body,
          params: ctx.request.query,
        };
      });

    const request = Request.create({
      method: 'get',
      path: 'su',
      payload: {
        data, params,
      },
    }, axios.create({ baseURL: server.getURL().href }));

    await request.getResult().then((response) => {
      expect(response.data).toMatchObject({ data, params });
    });
  });

  test('with headers', async () => {
    const headers = {
      Authorization: 'XXX',
    };

    server.get('/success')
      .mockImplementationOnce((ctx) => {
        ctx.status = 200;
        ctx.body = {
          Authorization: ctx.request.headers.authorization,
        };
      });

    const request = Request.create({
      method: 'get',
      path: 'success',
      headers,
    }, axios.create({ baseURL: server.getURL().href }));

    await request.getResult().then((response) => {
      expect(response.data).toMatchObject(headers);
    });
  });

  test('fail', async () => {
    const errors = {
      field: 'you crazy',
    };

    server.get('/error')
      .mockImplementation((ctx) => {
        ctx.status = 401;
        ctx.body = errors;
      });

    const request = Request
      .create({
        method: 'get',
        path: 'error',
      }, axios.create({ baseURL: server.getURL().href }));

    await request.getResult().catch((e) => {
      expect(e.data).toMatchObject(errors);
      expect(e.status).toEqual(401);
    });

    await expect(request.getResult()).rejects.toThrow(RequestFailedException);
  });

  test('fail promise like', async () => {
    const errors = {
      field: 'you crazy',
    };

    server.get('/error')
      .mockImplementation((ctx) => {
        ctx.status = 401;
        ctx.body = errors;
      });

    const request = Request
      .create({
        method: 'get',
        path: 'error',
      }, axios.create({ baseURL: server.getURL().href }));

    await request.catch((e) => {
      expect(e.data).toMatchObject(errors);
      expect(e.status).toEqual(401);
    });

    await expect(request.getResult()).rejects.toThrow(RequestFailedException);
  });

  test('cancel', async () => {
    const request = Request
      .create({
        method: 'get',
        path: 'error',
      }, axios.create({ baseURL: server.getURL().href }));

    request.cancel();

    await request.getResult().catch((e) => {
      expect(e.code).toEqual('ERR_CANCELED');
      expect(e.isCanceled).toBeTruthy();
    });

    await expect(request.getResult()).rejects.toThrow(RequestFailedException);
  });
});

describe('Request events', () => {
  const server = new MockServer();

  beforeAll(async () => {
    await server.start();
  });
  afterAll(async () => {
    await server.stop();
  });
  beforeEach(() => {
    server.reset();
  });

  test('load', async () => {
    const testBody = {
      foo: 'bar',
    };
    server.get('/success')
      .mockImplementationOnce((ctx) => {
        ctx.body = testBody;
        ctx.status = 200;
        ctx.headers['content-type'] = 'application/json';
      });

    const handler = jest.fn();

    const request = Request.create({
      method: 'get',
      path: 'success',
    }, axios.create({ baseURL: server.getURL().href }));

    request.on('load', handler);
    await request.getResult();

    expect(handler).toBeCalledTimes(1);
  });

  test('error', async () => {
    const handler = jest.fn();

    const request = Request.create({
      method: 'get',
      path: 'error',
    }, axios.create({ baseURL: server.getURL().href }));

    request.on('error', handler);
    await request.getResult().catch(() => {});

    expect(handler).toBeCalledTimes(1);
  });

  test('events off', async () => {
    const handler = jest.fn();

    const request = Request.create({
      method: 'get',
      path: 'error',
    }, axios.create({ baseURL: server.getURL().href }));

    await request.getResult().catch(() => {});

    request.on('error', handler);
    request.off('error', handler);

    await request.getResult().catch(() => {});

    expect(handler).toBeCalledTimes(0);
  });
});
