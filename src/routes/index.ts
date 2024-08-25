import { Router } from 'express';
import { authRoutes } from './auth';

const rootRouters: Router = Router()

rootRouters.use('/auth', authRoutes)

export default rootRouters;