import { Request, Router } from 'express'
import { login, me, signup } from '../controllers/auth'
import { errorHandler } from '../error-handler'
import authorizeMiddleware from '../middlewares/authorized'

export const authRoutes: Router = Router()

authRoutes.post('/signup', errorHandler(signup))
authRoutes.post('/login', errorHandler(login))
authRoutes.get('/me', [authorizeMiddleware], errorHandler(me))
