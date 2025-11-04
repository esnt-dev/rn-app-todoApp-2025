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

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { register, loading, error } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!displayName.trim() || !email.trim() || !password.trim()) {
      return Alert.alert("Atención", "Por favor completa todos los campos.");
    }

    const success = await register(email, password, displayName);

    if (success) {
      router.replace("/todos");
    } else {
      Alert.alert("Error", error || "No se pudo registrar el usuario");
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
        {/* Header */}
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>
          Completa tus datos para comenzar a usar TodoApp.
        </Text>

        {/* Form */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#7A7A7A"
            value={displayName}
            onChangeText={setDisplayName}
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#7A7A7A"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#7A7A7A"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Registrarme</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.linkText}>¿Ya tienes cuenta?</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkHighlight}> Inicia sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    color: "#34C759",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    color: "#555",
    marginBottom: 35,
    paddingHorizontal: 10,
  },
  form: {
    width: "100%",
  },
  input: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderRadius: 14,
    marginBottom: 18,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  button: {
    backgroundColor: "#34C759",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  linkText: {
    fontSize: 16,
    color: "#555",
  },
  linkHighlight: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0A84FF",
    textAlign: "center",
    marginTop: 5,
  },
});
