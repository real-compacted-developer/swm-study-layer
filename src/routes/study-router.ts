import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';
import { createStudyGroup, deleteStudyGroup, getAllStudyGroups, getStudyGroup } from '../fetch/study-group-fetch';
import { createStudyData, getStudyData, getStudyDataByGroupId } from '../fetch/study-data-fetch';
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

  const result = await getStudyGroup(decodeURI(id));
  res.status(200).json({
    success: true,
    data: result
  });
});

router.get('/data/:studyGroupId', async (req, res) => {
  const { studyGroupId } = req.params;

  const result = await getStudyDataByGroupId(decodeURI(studyGroupId));
  if (result.length === 0) {
    res.status(200).json({
      success: true,
      data: []
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: result[0]
  });
});

router.get('/info/:studyDataId', async (req, res) => {
  const { studyDataId } = req.params;

  const result = await getStudyData(studyDataId);
  const data = await getStudyGroup(result.studyGroupId);

  res.status(200).json({
    success: true,
    data
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

  try {
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
    const dateFormat = date.toISOString().slice(0, 10);

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
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      success: false
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await deleteStudyGroup(decodeURI(id));
  res.status(200).json({
    success: true,
    data: result
  });
});

export default router;
