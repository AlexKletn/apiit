export interface ResponseOptions<ResponseType> {
  data: ResponseType
  headers: {
    [key: string]: string | number
  }
}

export interface ResponseSuccessful<ResponseType> extends ResponseOptions<ResponseType> {
  contentType?: string,
  fileName?: string,
}
