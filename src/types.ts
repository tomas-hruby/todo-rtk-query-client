export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdDate: number;
  completedDate?: number;
}

export interface CreateTaskRequest {
  text: string;
}

export interface UpdateTaskRequest {
  text: string;
}
