import { Status } from '../helpers/help';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: Status;
}
