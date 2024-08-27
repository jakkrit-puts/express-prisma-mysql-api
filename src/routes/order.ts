import { Router } from 'express';
import authorizeMiddleware from '../middlewares/authorized';
import { errorHandler } from '../error-handler';
import { calcelOrder, createOrder, getOrderById, listOrders } from '../controllers/order';

const orderRoutes: Router = Router();

orderRoutes.post('/', [authorizeMiddleware], errorHandler(createOrder));
orderRoutes.get('', [authorizeMiddleware], errorHandler(listOrders));
orderRoutes.put('/:id', [authorizeMiddleware], errorHandler(calcelOrder));
orderRoutes.get('/:id', [authorizeMiddleware], errorHandler(getOrderById));

export default orderRoutes;