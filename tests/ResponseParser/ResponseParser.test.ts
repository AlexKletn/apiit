import { describe, expect, test } from '@jest/globals';
import { ResponseParser } from '@/ResponseParser';

describe('ResponseParser', () => {
  test('parse json response', () => {
    const data = { foo: 'bar' };
    const parsed = ResponseParser.parse({
      data,
      headers: {
        'content-type': 'application/json',
      },
    });

    expect(parsed).toMatchObject({
      data,
      contentType: 'application/json',
    });
  });
  test.each(['attachment; filename=foo.txt', 'attachment; filename="foo.txt"'])('parse file response with content-disposition header = %s', (contentDisposition) => {
    const data = 'fsdfasd';
    const parsed = ResponseParser.parse({
      data,
      headers: {
        'content-type': 'text/plain',
        'content-disposition': contentDisposition,
      },
    });

    expect(parsed).toMatchObject({
      data,
      contentType: 'text/plain',
      fileName: 'foo.txt',
    });
  });
});
