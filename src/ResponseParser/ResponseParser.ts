import type { Response, ResponseOptions } from './types';

class ResponseParser {
  static parse<ResponseType>(
    { data, headers }: ResponseOptions<ResponseType>,
  ): Response<ResponseType> {
    const contentDisposition = headers['Content-Disposition'] ?? headers['content-disposition'];

    const contentType = headers['Content-Type'];
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
