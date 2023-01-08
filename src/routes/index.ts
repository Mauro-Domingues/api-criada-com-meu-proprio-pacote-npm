import { Router } from 'express';
import postRouter from './postRouter';

const routes = Router();
routes.use('/posts', postRouter);

export default routes;
