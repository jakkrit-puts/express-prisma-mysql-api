import { Request, Response } from 'express';
import { AddressSchema } from '../schema/users';
import { NotFoundException } from '../exceptions/not-found';
import { prismaClient } from '..';
import { User } from '@prisma/client';
import { ErrorCode } from '../exceptions/root';

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body)

  try {
    const address = await prismaClient.address.create({
      data: {
        ...req.body,
        userId: req.user.id
      }
    })

    res.status(201).json(address)
  } catch (error) {
    console.log(error);
  }
}

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    await prismaClient.address.delete({
      where: {
        id: +req.params.id
      }
    })

    res.status(200).json({
      success: true
    });

  } catch (error) {
    throw new NotFoundException("Address Not Found.", ErrorCode.ADDRESS_NOT_FOUND);
  }
}

export const listAddress = async (req: Request, res: Response) => {
  const addresses = await prismaClient.address.findMany({
    where: {
      userId: req.user.id
    }
  })

  res.status(200).json(addresses)
}