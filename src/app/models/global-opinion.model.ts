import { SingleOpinion } from './single-opinion.model';

export interface GlobalOpinion {
  _id: string;
  starters: SingleOpinion[];
  main_courses: SingleOpinion[];
  desserts: SingleOpinion[];
  place_id: string;
}
