import {Todo} from '../entities/Todo';
import {TodoRepository} from '../repositories/TodoRepository';

export class ToggleTodo {
  constructor(private todoRepository: TodoRepository) {}
  async execute(id: string): Promise<Todo> {
    const todo = await this.todoRepository.getById(id);
    
    if (!todo) {
      throw new Error('Tarea no encontrada');
    }

    return await this.todoRepository.update({
      ...todo,
      completed: !todo.completed,
    });
  }
}