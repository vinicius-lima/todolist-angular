export interface Task {
  id: number;
  title: string;
  description?: string;
  author: string;
  status: string;
  creationDate: string;
  lastUpdate: string;
  projectId: number;
}
