import { Request, Response } from 'express';
import { prismaClient } from '..';

export const createOrder = async (req: Request, res: Response) => {
  return await prismaClient.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        product: true
      }
    })

    if (cartItems.length == 0) {
      return res.json({ message: "cart is empty" })
    }

    const price = cartItems.reduce((prev, current) => {
      return prev + current.quantity * +current.product.price
    }, 0)

    const orderData = await tx.order.create({
      data: {
        userId: req.user.id,
        netAmount: price,
        address: "Test 111",
        OrderProduct: {

        }
      }
    })

    const orderEvent = await tx.orderEvent.create({
      data: {
        orderId: orderData.id,
      }
    })

    await tx.cartItem.deleteMany({
      where: {
        userId: req.user.id
      }
    })

    return res.status(200).json(orderData)

  })
}

export const listOrders = async (req: Request, res: Response) => {

}

export const calcelOrder = async (req: Request, res: Response) => {

}

export const getOrderById = async (req: Request, res: Response) => {

}