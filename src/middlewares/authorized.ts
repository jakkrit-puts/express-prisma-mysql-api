import { NextFunction, Request, Response } from 'express';
import { ErrorCode, HttpException } from '../exceptions/root';
import { UnauthorizedException } from '../exceptions/unauthorized';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../secrets';
import { prismaClient } from '..';

const authorizeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
  }


  try {
    if (token) {

      const payload = jwt.verify(token, JWT_SECRET_KEY) as any;
      const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });
      if (!user) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
      }

      req.user = user
      next()
    }

  } catch (error) {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
  }


}

export default authorizeMiddleware