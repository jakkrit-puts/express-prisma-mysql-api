import { Router } from 'express';
import { authRoutes } from './auth';
import { productRoutes } from './products';

const rootRouters: Router = Router()

rootRouters.use('/auth', authRoutes)
rootRouters.use('/product', productRoutes)

export default rootRouters;