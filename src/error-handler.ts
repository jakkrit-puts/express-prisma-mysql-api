import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-error"
import { ZodError } from "zod"
import { BadRequestException } from "./exceptions/bad-requests"

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next)
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new BadRequestException("UnprocessableEntity", ErrorCode.UNPROCESSABLE_ENTITY, error)
        } else {
          exception = new InternalException("Somthing went wrong!!!", error, ErrorCode.INTERNAL_EXCEPTION)
        }

      }
      next(exception)
    }
  }
}

