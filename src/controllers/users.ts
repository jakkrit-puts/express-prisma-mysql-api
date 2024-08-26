import { Request, Response } from 'express';
import { AddressSchema, UpdateUserSchema } from '../schema/users';
import { NotFoundException } from '../exceptions/not-found';
import { prismaClient } from '..';
import { User, Address } from '@prisma/client';
import { ErrorCode } from '../exceptions/root';
import { BadRequestException } from '../exceptions/bad-requests';

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

export const updateUser = async (req: Request, res: Response) => {
  console.log("loggggg");
  
  const validateUserData = UpdateUserSchema.parse(req.body)
  let shippingAddress: Address;
  let billingAddress: Address;

  if (validateUserData.defaultShippingAddress) {
    try {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validateUserData.defaultShippingAddress
        }
      })

      if (shippingAddress.userId != req.user.id) {
        throw new BadRequestException("Address Not Belong user.", ErrorCode.ADDRESS_NOT_BELONG_USER);
      }
    } catch (error) {
      throw new NotFoundException("Address Not Found.", ErrorCode.ADDRESS_NOT_FOUND);
    }
  }

  if (validateUserData.defaultBillingAddress) {
    try {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validateUserData.defaultBillingAddress
        }
      })

      if (billingAddress.userId != req.user.id) {
        throw new BadRequestException("Address Not Belong user.", ErrorCode.ADDRESS_NOT_BELONG_USER);
      }
    } catch (error) {
      throw new NotFoundException("Address Not Found.", ErrorCode.ADDRESS_NOT_FOUND);
    }
  }

  const updateUser = await prismaClient.user.update({
    where: {
      id: req.user.id
    },
    data: validateUserData
  })

  res.status(200).json(updateUser);

}