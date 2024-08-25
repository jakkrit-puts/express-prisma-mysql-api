import express, { Express, Request, Response } from 'express';
import { PORT } from './secrets';
import rootRouters from './routes';
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from './middlewares/errors';

const app:Express = express();

app.use(express.json());

app.use('/api', rootRouters)

export const prismaClient = new PrismaClient({
  log: ['query']
})

app.use(errorMiddleware)

app.listen(PORT, () => { console.log("server runing...") });