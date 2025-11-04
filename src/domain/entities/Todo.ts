export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  userId: string; //Nuevo ID del usuario dueño de esta tarea
}

export interface CreateTodoDTO {
  title: string;
  userId: string; 
}

export interface UpdateTodoDTO {
  id: string;
  title?: string;
  completed?: boolean;
}