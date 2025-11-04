import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/presentation/context/AuthContext";
import { container } from "@/src/di/container";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function ProfileScreen() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(""); // Nuevo nombre
  const [loading, setLoading] = useState(true); // Carga inicial
  const [saving, setSaving] = useState(false); // Para el botón actualizar
  const colorScheme = useColorScheme();

  // Inicializa el nombre y termina el loading
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setLoading(false);
    }
    SplashScreen.hideAsync();
  }, [user]);

  // Actualizar perfil
  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "El nombre no puede estar vacío");
      return;
    }

    setSaving(true);
    try {
      // Llamamos al repositorio para actualizar el nombre
      await container.authRepository.updateProfile(name.trim());

      // Actualizamos el contexto de Auth
      if (user) setUser({ ...user, displayName: name.trim() });

      Alert.alert("Éxito", "Nombre actualizado correctamente");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "No se pudo actualizar el nombre");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      </SafeAreaView>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: colorScheme === "dark" ? "#121212" : "#fff" },
        ]}
      >
        {/* BLOQUE DE INFORMACIÓN DEL USUARIO */}
        <View
          style={[
            styles.infoBox,
            { backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#f5f5f5" },
          ]}
        >
          <Text style={[styles.infoLabel, { color: colorScheme === "dark" ? "#aaa" : "#555" }]}>
            Correo
          </Text>
          <Text style={[styles.infoValue, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>
            {user?.email}
          </Text>

          <Text style={[styles.infoLabel, { color: colorScheme === "dark" ? "#aaa" : "#555" }]}>
            Nombre Actual
          </Text>
          <Text style={[styles.infoValue, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>
            {user?.displayName}
          </Text>
        </View>

        {/* BLOQUE DE ACTUALIZACIÓN DEL NOMBRE */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.label, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>
            Nuevo Nombre
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: colorScheme === "dark" ? "#444" : "#ccc",
                color: colorScheme === "dark" ? "#fff" : "#000",
              },
            ]}
            value={name}
            onChangeText={setName}
            placeholder="Ingrese su nuevo nombre"
            placeholderTextColor={colorScheme === "dark" ? "#888" : "#aaa"}
          />

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: saving ? "#888" : "#4CAF50", marginTop: 12 },
            ]}
            onPress={handleUpdateProfile}
            disabled={saving}
          >
            <Text style={styles.buttonText}>
              {saving ? "Actualizando..." : "Actualizar nombre"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  infoBox: {
    borderRadius: 12,
    padding: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  infoValue: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: "500",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
