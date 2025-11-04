import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuth } from "@/src/presentation/hooks/useAuth";
import { useTodos } from "@/src/presentation/hooks/useTodos";
import {
  createStyles,
  defaultDarkTheme,
  defaultLightTheme,
} from "@/src/presentation/styles/todos.styles";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodosScreenClean() {
  const [inputText, setInputText] = useState("");
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { user: authUser, logout } = useAuth();
  const router = useRouter();

  // State local para forzar re-render cuando user cambia
  const [user, setUser] = useState(authUser);

  // Mantener user actualizado automáticamente
  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  const colorScheme = useColorScheme();
  const styles = useMemo(
    () =>
      createStyles(
        colorScheme === "dark" ? defaultDarkTheme : defaultLightTheme
      ),
    [colorScheme, user] // Dependencia en user para re-render al actualizar nombre
  );

  const handleAddTodo = async () => {
    if (!inputText.trim()) return;
    const success = await addTodo(inputText);
    if (success) setInputText("");
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) router.replace("/login");
  };

  const handleEditProfile = () => {
    router.push("/profile"); // Navega a la pantalla de perfil
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.centerContent]}>
          <ActivityIndicator
            size="large"
            color={
              colorScheme === "dark"
                ? defaultDarkTheme.primary
                : defaultLightTheme.primary
            }
          />
          <Text style={styles.loadingText}>Cargando tareas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderTodo = ({ item }: { item: any }) => {
    const handleConfirmDelete = () => {
      Alert.alert(
        "Confirmar",
        "¿Estás seguro de que deseas eliminar esta tarea?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: () => deleteTodo(item.id),
          },
        ]
      );
    };

    return (
      <View style={styles.todoItem}>
        <TouchableOpacity
          style={styles.todoContent}
          onPress={() => toggleTodo(item.id)}
        >
          <View
            style={[styles.checkbox, item.completed && styles.checkboxChecked]}
          >
            {item.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text
            style={[styles.todoText, item.completed && styles.todoTextCompleted]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleConfirmDelete}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.userAvatarPlaceholder}>
            <Text style={styles.userAvatarText}>
              {user?.displayName?.charAt(0) || "U"}
            </Text>
          </View>

          <Text style={styles.userName}>{user?.displayName || "Usuario"}</Text>

          {/* BOTÓN: Editar Perfil */}
          <TouchableOpacity
            onPress={handleEditProfile}
            style={[styles.logoutButton, { backgroundColor: "#4CAF50", marginRight: 8 }]}
          >
            <Text style={[styles.logoutText, { color: "#fff" }]}>Editar Perfil</Text>
          </TouchableOpacity>

          {/* BOTÓN: Salir */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Mis Tareas</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Nueva tarea..."
            placeholderTextColor={
              colorScheme === "dark"
                ? defaultDarkTheme.placeholder
                : defaultLightTheme.placeholder
            }
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          renderItem={renderTodo}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          contentContainerStyle={[styles.listContent, { paddingBottom: 80 }]}
        />

        <Text style={styles.footer}>
          Total: {todos.length} | Completadas:{" "}
          {todos.filter((t) => t.completed).length}
        </Text>
      </View>
    </SafeAreaView>
  );
}
