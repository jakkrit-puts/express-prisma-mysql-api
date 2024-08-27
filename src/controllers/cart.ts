import { NextFunction, Request, Response } from 'express';
import { ChangeQuantitySchema, CreateCartSchema } from '../schema/cart';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { Product } from '@prisma/client';
import { prismaClient } from '..';

export const addItemCart = async (req: Request, res: Response) => {
  // check product exist and change quantity
  const validatedData = CreateCartSchema.parse(req.body)
  let product: Product;

  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId
      }
    })
  } catch (error) {
    throw new NotFoundException('Product not found.', ErrorCode.PRODUCT_NOT_FOUND)
  }

  const cart = await prismaClient.cartItem.create({
    data: {
      userId: req.user.id,
      productId: product.id,
      quantity: validatedData.quantity
    }
  })

  res.status(201).json(cart);
}

export const deleteItemFromCart = async(req: Request, res: Response) => {
  // check if user is deleting his own item (where userId)
  await prismaClient.cartItem.delete({
    where:{
      id: +req.params.id,
      userId: req.user.id
    }
  })

  res.status(200).json({
    success: true
  })
}

export const changeQuantity = async(req: Request, res: Response) => {
  const validatedData = ChangeQuantitySchema.parse(req.body)
  const updateCart = await prismaClient.cartItem.update({
    where: {
      id: +req.params.id,
      userId: req.user.id
    },
    data: {
      quantity: validatedData.quantity,
    }
  })

  res.status(200).json(updateCart);
}

export const getCart = async(req: Request, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      userId: req.user.id
    },
    include: {
      product: true
    }
  })

  res.status(200).json(cart);
}