import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';
import { createStudyGroup, deleteStudyGroup, getAllStudyGroups, getStudyGroup } from '../fetch/study-group-fetch';
import { createStudyData } from '../fetch/study-data-fetch';
import { logger } from '../index';

const router = Router();

router.get('/', async (req, res) => {
  const result = await getAllStudyGroups();
  res.status(200).json({
    success: true,
    data: result
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await getStudyGroup(id);
  res.status(200).json({
    success: true,
    data: result
  });
});

const studyCreateValidator = [
  body('title').isString(),
  body('category').isString(),
  body('password').isString(),
  body('maxPeople').isNumeric(),
  body('owner').isString(),
  body('isPremium').isBoolean()
];
router.post('/', studyCreateValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, error: errors.array() });
    return;
  }

  const { title, category, password, maxPeople, owner, isPremium } = req.body;

  const salt = crypto.randomBytes(64);
  const encodePassword = crypto.pbkdf2Sync(
    password,
    salt.toString('base64'),
    100000,
    64,
    'sha512'
  );

  const result = await createStudyGroup({
    title,
    category,
    password: encodePassword.toString('base64'),
    salt: salt.toString('base64'),
    maxPeople: parseInt(maxPeople, 10),
    owner,
    isPremium: isPremium.toString().toLowerCase() === 'true'
  });

  const date = new Date();
  const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  await createStudyData({
    week: 1,
    date: dateFormat,
    slideInfo: [],
    studyGroupId: result.id
  });

  res.status(200).json({
    success: true,
    data: result
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await deleteStudyGroup(id);
  res.status(200).json({
    success: true,
    data: result
  });
});

export default router;
