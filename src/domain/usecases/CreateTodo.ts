import {Todo, CreateTodoDTO} from '../entities/Todo';
import {TodoRepository} from '../repositories/TodoRepository';

export class CreateTodo{
  constructor(private todoRepository: TodoRepository) {}

  async execute (data: CreateTodoDTO): Promise<Todo> {
    if (!data.title.trim()) {
      throw new Error("El título no puede estar vacío");
    }

    if (data.title.length > 200){
      throw new Error('El titulo no puede tener mas de 200 caracteres')
    }

    if (!data.userId){
      throw new Error("User ID is required");
    }

    return await this.todoRepository.create(data)
  }

}