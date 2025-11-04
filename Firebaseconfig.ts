// firebaseConfig.ts
import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDoevHbDm4g-XumZwGrv0pjJR7t6w9rLVM",
  authDomain: "epn-project-2025.firebaseapp.com",
  projectId: "epn-project-2025",
  storageBucket: "epn-project-2025.firebasestorage.app",
  messagingSenderId: "1067191156705",
  appId: "1:1067191156705:web:30b53ed46f4539ea035ca0"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Inicializar Auth con persistencia en React Native
// @ts-ignore
export const auth = initializeAuth(app, {
  // @ts-ignore
  persistence: getReactNativePersistence(AsyncStorage),
});
