import { Router } from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import usersRoutes from './users';
import cartRoutes from './cart';
import orderRoutes from './order';

const rootRouters: Router = Router()

rootRouters.use('/auth', authRoutes)
rootRouters.use('/product', productRoutes)
rootRouters.use('/user', usersRoutes)
rootRouters.use('/cart', cartRoutes)
rootRouters.use('/order', orderRoutes)

export default rootRouters;