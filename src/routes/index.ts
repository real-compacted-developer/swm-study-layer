import { Router } from 'express';
import userAPI from './study-router';

const router = Router();

router.use('/group', userAPI);

export default router;
