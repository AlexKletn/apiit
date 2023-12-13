export interface ResponseOptions<ResponseType> {
  data: ResponseType
  headers: {
    [key: string]: any
  }
}

export interface Response<ResponseType> extends ResponseOptions<ResponseType> {
  contentType: string,
  fileName: string,
}
