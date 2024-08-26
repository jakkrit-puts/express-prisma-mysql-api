// class error handler (msg, status code, error code, error)

export class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: ErrorCode

  constructor(
    message: string,
    errorCode: any,
    statusCode: number,
    errors: ErrorCode
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  UNPROCESSABLE_ENTITY = 20001,
  INTERNAL_EXCEPTION = 3001,
  UNAUTHORIZED = 40001,
  ADDRESS_NOT_FOUND = 40002,
  PRODUCT_NOT_FOUND = 50001
}

export enum ErrorMessage {
  // refactor
  USER_NOT_FOUND = "",
  USER_ALREADY_EXISTS = "",
  INCORRECT_PASSWORD = "",
  UNPROCESSABLE_ENTITY = "",
  INTERNAL_EXCEPTION = "",
  UNAUTHORIZED = "",
  PRODUCT_NOT_FOUND = ""
}