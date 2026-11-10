export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  price: number;
  durationHours: number;
  difficultyLevel: DifficultyLevel;
  instructor: string;
}
