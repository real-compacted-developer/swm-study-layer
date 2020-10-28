type UUID = string;

export interface StudyGroupType {
  readonly id: UUID;
  readonly title: string;
  readonly category: string;
  readonly password: string;
  readonly salt: string;
  readonly people: UUID[];
  readonly maxPeople: number;
  readonly owner: UUID;
  readonly isPremium: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
