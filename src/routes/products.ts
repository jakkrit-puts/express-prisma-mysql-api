import { Request, Router } from 'express'
import { errorHandler } from '../error-handler'
import authorizeMiddleware from '../middlewares/authorized'
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from '../controllers/products'
import adminMiddleware from '../middlewares/admin'

export const productRoutes: Router = Router()

productRoutes.post('/create', [authorizeMiddleware, adminMiddleware], errorHandler(createProduct))
productRoutes.put('/:id', [authorizeMiddleware, adminMiddleware], errorHandler(updateProduct))
productRoutes.delete('/:id', [authorizeMiddleware, adminMiddleware], errorHandler(deleteProduct))
productRoutes.get('/', [authorizeMiddleware, adminMiddleware], errorHandler(listProducts))
productRoutes.get('/:id', [authorizeMiddleware, adminMiddleware], errorHandler(getProductById))