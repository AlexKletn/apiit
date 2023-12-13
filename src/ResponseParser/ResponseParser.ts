import type { Response, ResponseOptions } from './types';

class ResponseParser {
  static parse<ResponseType>(
    { data, headers }: ResponseOptions<ResponseType>,
  ): Response<ResponseType> {
    const contentDisposition = headers ? headers['content-disposition'] : undefined;

    const contentType = headers ? headers['content-type'] : undefined;
    const fileName = contentDisposition
      ?.replace(/[A-Za-z\d; ]*?filename="?([\w\-+\d(){}.']+)"?/i, '$1');

    return {
      data,
      contentType,
      fileName,

      headers,
    };
  }
}

export default ResponseParser;
