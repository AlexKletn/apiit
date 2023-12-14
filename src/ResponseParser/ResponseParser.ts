import type { ResponseOptions, ResponseSuccessful } from './types';

class ResponseParser {
  static parse<ResponseType>(
    { data, headers }: ResponseOptions<ResponseType>,
  ): ResponseSuccessful<ResponseType> {
    const contentDisposition = headers ? headers['content-disposition'] : undefined;

    const contentType: string = headers ? headers['content-type'] as string : undefined;
    const fileName = (contentDisposition as string)
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
