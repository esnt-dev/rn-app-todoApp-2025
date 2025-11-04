import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/Firebaseconfig";
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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isEmailValid = !touched || isValidEmail(email);

  const handlePasswordReset = async () => {
    setTouched(true);

    if (!isValidEmail(email)) {
      return Alert.alert("Atención", "Por favor ingresa un correo válido.");
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert(
        "Correo enviado",
        "Te enviamos un enlace para restablecer tu contraseña.",
        [{ text: "OK", onPress: () => router.back() }]
      );
      setEmail("");
      setTouched(false);
    } catch (error: unknown) {
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "No se pudo enviar el correo. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#FF3B30" />
        </TouchableOpacity>

        {/* Títulos */}
        <Text style={styles.title}>Recuperar contraseña</Text>
        <Text style={styles.subtitle}>
          Te enviaremos un enlace para que puedas restablecer tu contraseña
        </Text>

        {/* Input con icono */}
        <View style={[styles.inputContainer, !isEmailValid && styles.inputError]}>
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
            onChangeText={text => {
              setTouched(true);
              setEmail(text);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {!isEmailValid && (
          <Text style={styles.errorText}>Correo electrónico inválido</Text>
        )}

        {/* Botón */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handlePasswordReset}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Enviar enlace</Text>
          )}
        </TouchableOpacity>

        {/* Link */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.linkText}>Inicio de sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 40,
  },
  backButton: {
    width: 50,
    paddingVertical: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    color: "#FF3B30",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 35,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 12,
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
    marginBottom: 15,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#FF3B30",
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
  linkText: {
    fontSize: 16,
    textAlign: "center",
    color: "#0A84FF",
    fontWeight: "600",
    marginTop: 25,
  },
});
