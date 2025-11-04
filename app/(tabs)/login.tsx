import { useAuth } from "@/src/presentation/hooks/useAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isEmailValid = !touched || isValidEmail(email);

  const handleLogin = async () => {
    setTouched(true);

    if (!email.trim() || !password.trim()) {
      Alert.alert("Atención", "Por favor completa todos los campos.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Correo inválido", "Ingresa un correo electrónico válido.");
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.replace("/todos");
    } else {
      Alert.alert("Error", error || "No se pudo iniciar sesión");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo + Bienvenida */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="checkmark-done" size={45} color="#fff" />
          </View>
          <Text style={styles.title}>TodoApp</Text>
          <Text style={styles.subtitle}>Bienvenido 👋</Text>
        </View>

        {/* Inputs */}
        <View>
          <View
            style={[
              styles.inputContainer,
              !isEmailValid && styles.inputError,
            ]}
          >
            <Ionicons
              name="mail-outline"
              size={22}
              color={isEmailValid ? "#555" : "#FF3B30"}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#7A7A7A"
              value={email}
              onChangeText={(text) => {
                setTouched(true);
                setEmail(text);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {!isEmailValid && (
            <Text style={styles.errorText}>Correo inválido</Text>
          )}

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#555"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#7A7A7A"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>

          {/* Link Olvidé mi contraseña */}
          <TouchableOpacity
            onPress={() => router.push("/forgot-password")}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer — Registro */}
        <View style={styles.footer}>
          <Text style={styles.linkText}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.linkHighlight}> Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 45,
  },
  logoCircle: {
    backgroundColor: "#0A84FF",
    width: 85,
    height: 85,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#0A84FF",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  inputIcon: { marginRight: 8 },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#000",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#0A84FF",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  forgotPasswordContainer: { marginTop: 15, alignItems: "center" },
  forgotPasswordText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  linkText: {
    color: "#555",
    fontSize: 16,
  },
  linkHighlight: {
    color: "#34C759",
    fontSize: 16,
    fontWeight: "900",
  },
});
