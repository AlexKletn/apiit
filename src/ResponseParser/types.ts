export interface ResponseOptions<ResponseType> {
  data: ResponseType
  headers: {
    [key: string]: unknown
  }
}

interface ResponseFailed {
  error?: Error
}

interface ResponseSuccessful<ResponseType> extends ResponseOptions<ResponseType> {
  contentType?: string,
  fileName?: string,
}

export type Response<ResponseType> = ResponseFailed | ResponseSuccessful<ResponseType>;
