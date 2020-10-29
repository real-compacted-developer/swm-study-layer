import axios from 'axios';
import config from '../config';
import { StudyDataType } from '../types/studydata';
import { logger } from '../index';

interface CreateBody {
  readonly week: number;
  readonly date: string;
  readonly slideInfo: string[];
  readonly studyGroupId: string;
}

// eslint-disable-next-line import/prefer-default-export
export const createStudyData = async (props: CreateBody): Promise<StudyDataType> => {
  const res = await axios.post(`${config.DB_LAYER_API}/studydata`, {
    week: props.week,
    date: props.date,
    slideInfo: props.slideInfo,
    studyGroupId: props.studyGroupId
  });
  return res.data.data;
};
