import { Request, Response } from 'express';
import { prismaClient } from '..'
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';

export const createProduct = async (req: Request, res: Response) => {
  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(',')
    }
  })

  res.status(201).json(product);
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const id = +req.params.id;

    if (product.tags) {
      product.tags = product.tags.join(',')
    }

    const updateProduct = await prismaClient.product.update({
      where: {
        id: id
      },
      data: product
    })

    res.status(200).json(updateProduct)

  } catch (error) {
    throw new NotFoundException('Product not found.', ErrorCode.PRODUCT_NOT_FOUND)
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    await prismaClient.product.delete({
      where: {
        id: id
      }
    })

    res.status(204).json({
      message: "remove record successfully."
    })
  } catch (error) {
    throw new NotFoundException('Product not found.', ErrorCode.PRODUCT_NOT_FOUND)
  }
}

export const listProducts = async (req: Request, res: Response) => {


  const count = await prismaClient.product.count();
  const products = await prismaClient.product.findMany({
    skip: +req.query.skip! || 0,
    take: 5
  })

  res.status(200).json({
    count,
    data: products
  })

}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: +req.params.id
      }
    })

    res.status(200).json(
      product
    )
  } catch (error) {
    throw new NotFoundException('Product not found.', ErrorCode.PRODUCT_NOT_FOUND)
  }
}