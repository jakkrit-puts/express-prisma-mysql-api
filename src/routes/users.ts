import { Request, Router } from 'express'
import { errorHandler } from '../error-handler'
import authorizeMiddleware from '../middlewares/authorized'
import adminMiddleware from '../middlewares/admin'
import { addAddress, deleteAddress, listAddress } from '../controllers/users'

export const usersRoutes: Router = Router()

usersRoutes.post('/address', [authorizeMiddleware], errorHandler(addAddress))
usersRoutes.delete('/address/:id', [authorizeMiddleware], errorHandler(deleteAddress))
usersRoutes.get('/address', [authorizeMiddleware], errorHandler(listAddress))

