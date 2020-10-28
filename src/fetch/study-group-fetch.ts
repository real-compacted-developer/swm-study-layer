import axios from 'axios';
import config from '../config';
import { StudyGroupType } from '../types/studygroup';

interface CreateBody {
  readonly title: string;
  readonly category: string;
  readonly password: string;
  readonly salt: string;
  readonly maxPeople: number;
  readonly owner: string;
  readonly isPremium: boolean;
}

export const getAllStudyGroups = async (): Promise<StudyGroupType[]> => {
  const res = await axios.get(`${config.DB_LAYER_API}/studygroup`);
  return res.data.data;
};

export const getStudyGroup = async (id: string): Promise<StudyGroupType> => {
  const res = await axios.get(`${config.DB_LAYER_API}/studygroup/${id}`);
  return res.data.data;
};

export const createStudyGroup = async (props: CreateBody): Promise<StudyGroupType> => {
  const res = await axios.post(`${config.DB_LAYER_API}/studygroup`, {
    title: props.title,
    category: props.category,
    password: props.password,
    salt: props.salt,
    maxPeople: props.maxPeople,
    owner: props.owner,
    isPremium: props.isPremium
  });
  return res.data.data;
};

export const deleteStudyGroup = async (id: string): Promise<StudyGroupType> => {
  const res = await axios.delete(`${config.DB_LAYER_API}/studygroup/${id}`);
  return res.data.data;
};
