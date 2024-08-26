import { Router } from 'express';
import { authRoutes } from './auth';
import { productRoutes } from './products';
import { usersRoutes } from './users';

const rootRouters: Router = Router()

rootRouters.use('/auth', authRoutes)
rootRouters.use('/product', productRoutes)
rootRouters.use('/user', usersRoutes)

export default rootRouters;