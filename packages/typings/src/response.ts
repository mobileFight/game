export type Response<T> =
  | {
      status: "ok"
      data: T
    }
  | {
      status: "error"
      error: Error
    }
