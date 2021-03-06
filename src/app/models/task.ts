import { Status } from '../status.enum';

export interface Task {
  _id?: string;
  name: string;
  description: string;
  story_points: number;
  sprint?: number;
  status_in_sprint?: number;
  status_in_project?: Status;
}
