import { Router } from 'express';
import userAPI from './study-router';

const router = Router();

router.use('/', userAPI);

export default router;
