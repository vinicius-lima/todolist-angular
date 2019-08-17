export interface Task {
  id: number;
  title: string;
  description?: string;
  author: string;
  status: string;
  creatingDate: string;
  lastUpdate: string;
  projectId: number;
}
