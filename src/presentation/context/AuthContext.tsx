import React, { createContext, useState, useEffect, useContext } from "react";
import { User } from "@/src/domain/entities/User";
import { container } from "@/src/di/container";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void; // <- agregar setUser
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  setUser: () => {}, // <- agregar función vacía por defecto
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios de Firebase Auth
    const unsubscribe = container.authRepository.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          await AsyncStorage.setItem("@user", JSON.stringify(firebaseUser));
        } else {
          setUser(null);
          await AsyncStorage.removeItem("@user");
        }
      } catch (e) {
        console.error("Error en onAuthStateChanged:", e);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout
  const logout = async () => {
    try {
      await container.authRepository.logout();
      setUser(null);
      await AsyncStorage.removeItem("@user");
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
