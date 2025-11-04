import { TodoRepository } from "../repositories/TodoRepository";

export class DeleteTodo {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: string): Promise<void> {
    const todo = await this.todoRepository.getById(id);
    if (!todo) {
      throw new Error('Tarea no encontrada');
    }
    return await this.todoRepository.delete(id);
  }

} 