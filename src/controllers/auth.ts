import { NextFunction, Request, Response } from 'express';
import { prismaClient } from '..';
import { compare, compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../secrets';
import { ErrorCode } from '../exceptions/root';
import { BadRequestException } from '../exceptions/bad-requests';
import { UnprocessableEntity } from '../exceptions/validation';
import { SignupSchema } from '../schema/users';
import { NotFoundException } from '../exceptions/not-found';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  SignupSchema.parse(req.body)

  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequestException('User already exists!', ErrorCode.USER_ALREADY_EXISTS)
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10)
    }
  })

  res.status(201).json(user)
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND)
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestException('Password Incorrect !', ErrorCode.INCORRECT_PASSWORD);
  }

  const token = jwt.sign({
    userId: user.id
  }, JWT_SECRET_KEY)

  res.status(200).json({ user, token });
}

export const me = (req: Request, res: Response) => {
  res.send(req.user)
}