import { Router } from 'express';
import { errorHandler } from '../error-handler';
import authorizeMiddleware from '../middlewares/authorized'
import { addItemCart, changeQuantity, deleteItemFromCart, getCart } from '../controllers/cart';

const cartRoutes: Router = Router();

cartRoutes.post('/', [authorizeMiddleware], errorHandler(addItemCart));
cartRoutes.get('/', [authorizeMiddleware], errorHandler(getCart));
cartRoutes.delete('/:id', [authorizeMiddleware], errorHandler(deleteItemFromCart));
cartRoutes.put('/:id', [authorizeMiddleware], errorHandler(changeQuantity));

export default cartRoutes;