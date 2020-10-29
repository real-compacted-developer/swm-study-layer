type UUID = string;

interface QuestionType {
  readonly id: string;
  readonly user: UUID;
  readonly title: string;
  readonly content: string;
  readonly like: number;
  readonly slideOrder: number;
  readonly slideImageURL: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface StudyDataType {
  readonly id: number;
  readonly week: number;
  readonly date: Date;
  readonly slideInfo: string[];
  readonly studyGroupId: UUID;
  readonly questions: QuestionType[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
