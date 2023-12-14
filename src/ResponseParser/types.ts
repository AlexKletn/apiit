export interface ResponseOptions<ResponseType> {
  data: ResponseType
  headers: {
    [key: string]: string | number
  }
}

export interface ResponseFailed {
  error?: Error
}

export interface ResponseSuccessful<ResponseType> extends ResponseOptions<ResponseType> {
  contentType?: string,
  fileName?: string,
}

export type Response<ResponseType> = ResponseFailed | ResponseSuccessful<ResponseType>;
