// 🟢 CUSTOM HOOK: La UI solo interactúa con este hook
// No conoce nada sobre Firebase, repositorios o use cases

import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { container } from "@/src/di/container";
import { Todo } from "@/src/domain/entities/Todo";
import { useAuth } from "./useAuth"; // ← NUEVO: importar useAuth

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // ← NUEVO: obtener usuario actual

  const loadTodos = useCallback(async () => {
    // ← NUEVO: solo cargar si hay usuario autenticado
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // ← MODIFICADO: pasar userId
      const result = await container.getAllTodos.execute(user.id);
      setTodos(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      Alert.alert("Error", "No se pudieron cargar las tareas");
    } finally {
      setLoading(false);
    }
  }, [user]); // ← MODIFICADO: dependencia también incluye user

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async (title: string): Promise<boolean> => {
    if (!user) {
      Alert.alert("Error", "Debes estar autenticado para agregar tareas");
      return false;
    }

    try {
      const newTodo = await container.createTodo.execute({
        title,
        userId: user.id, // ← NUEVO
      });

      setTodos([newTodo, ...todos]);
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al agregar tarea";
      Alert.alert("Error", message);
      return false;
    }
  };

  const toggleTodo = async (id: string): Promise<void> => {
    try {
      const updatedTodo = await container.toggleTodo.execute(id);

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? updatedTodo : t))
      );
    } catch (err) {
      Alert.alert("Error", "No se pudo actualizar la tarea");
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await container.deleteTodo.execute(id);

      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      Alert.alert("Error", "No se pudo eliminar la tarea");
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refresh: loadTodos,
  };
};
