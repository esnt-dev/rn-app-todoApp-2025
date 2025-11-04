import { StyleSheet } from "react-native";

export interface TodosTheme {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryText: string;
  border: string;
  placeholder: string;
}

export const createStyles = (theme: TodosTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },

    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 16,
    },

    centerContent: {
      justifyContent: "center",
      alignItems: "center",
    },

    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: theme.textSecondary,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: theme.primary,
      marginBottom: 15,
      marginTop: 5,
      borderRadius: 12,
    },

    userAvatarPlaceholder: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: theme.primaryText + "22",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.primaryText,
    },

    userAvatarText: {
      color: theme.primaryText,
      fontSize: 18,
      fontWeight: "bold",
    },

    userName: {
      flex: 1,
      color: theme.primaryText,
      fontSize: 16,
      fontWeight: "bold",
    },

    logoutButton: {
      padding: 10,
      backgroundColor: theme.primaryText + "33",
      borderRadius: 8,
    },

    logoutText: {
      color: theme.primaryText,
      fontWeight: "bold",
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.text,
      fontFamily: "SpaceMono",
    },

    inputContainer: {
      flexDirection: "row",
      marginBottom: 15,
    },

    input: {
      flex: 1,
      backgroundColor: theme.surface,
      padding: 15,
      borderRadius: 10,
      fontSize: 16,
      marginRight: 10,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
    },

    addButton: {
      backgroundColor: theme.primary,
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },

    addButtonText: {
      color: theme.primaryText,
      fontSize: 30,
      fontWeight: "bold",
    },

    list: {
      flex: 1,
    },

    listContent: {
      paddingBottom: 20,
    },

    todoItem: {
      flexDirection: "row",
      backgroundColor: theme.surface,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.border,
    },

    todoContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },

    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.primary,
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
    },

    checkboxChecked: {
      backgroundColor: theme.primary,
    },

    checkmark: {
      color: theme.primaryText,
      fontSize: 16,
      fontWeight: "bold",
    },

    todoText: {
      fontSize: 16,
      flex: 1,
      color: theme.text,
      fontFamily: "SpaceMono",
    },

    todoTextCompleted: {
      textDecorationLine: "line-through",
      color: theme.textSecondary,
    },

    deleteButton: {
      padding: 8,
    },

    deleteButtonText: {
      fontSize: 20,
    },

    footer: {
      textAlign: "center",
      color: theme.textSecondary,
      marginTop: 10,
      fontSize: 14,
      marginBottom: 10,
    },
  });

export const defaultLightTheme: TodosTheme = {
  background: "#f5f5f5",
  surface: "#ffffff",
  text: "#000000",
  textSecondary: "#666666",
  primary: "#007AFF",
  primaryText: "#ffffff",
  border: "#e0e0e0",
  placeholder: "#999999",
};

export const defaultDarkTheme: TodosTheme = {
  background: "#000000",
  surface: "#1c1c1e",
  text: "#ffffff",
  textSecondary: "#999999",
  primary: "#0A84FF",
  primaryText: "#ffffff",
  border: "#38383a",
  placeholder: "#666666",
};
