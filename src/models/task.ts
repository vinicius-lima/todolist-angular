export interface Task {
  id: number;
  title: string;
  description?: string;
  author: string;
  updatedBy: string;
  status: string;
  creationDate: string;
  lastUpdate: string;
  projectId: number;
}
