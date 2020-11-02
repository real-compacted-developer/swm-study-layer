import axios from 'axios';
import config from '../config';
import { StudyDataType } from '../types/studydata';

interface CreateBody {
  readonly week: number;
  readonly date: string;
  readonly slideInfo: string[];
  readonly studyGroupId: string;
}

export const createStudyData = async (props: CreateBody): Promise<StudyDataType> => {
  const res = await axios.post(`${config.DB_LAYER_API}/studydata`, {
    week: props.week,
    date: props.date,
    slideInfo: props.slideInfo,
    studyGroupId: props.studyGroupId
  });
  return res.data.data;
};

export const getStudyDataByGroupId = async (id: string): Promise<StudyDataType[]> => {
  const res = await axios.get(`${config.DB_LAYER_API}/studydata/bystudy/${id}`);
  return res.data.data;
};

export const getStudyData = async (id: string): Promise<StudyDataType> => {
  const res = await axios.get(`${config.DB_LAYER_API}/studydata/${id}`);
  return res.data.data;
};
