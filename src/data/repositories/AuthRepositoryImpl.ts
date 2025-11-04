import { AuthRepository } from "@/src/domain/repositories/AuthRepository";
import { User } from "@/src/domain/entities/User";
import { FirebaseAuthDataSource } from "../datasources/FirebaseAuthDataSource";
import AuthLocalDataSource from "../datasources/AuthLocalDataSource";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private remoteDataSource: FirebaseAuthDataSource) {}

  async register(email: string, password: string, displayName: string): Promise<User> {
    const user = await this.remoteDataSource.register(email, password, displayName);
    await AuthLocalDataSource.saveUser(user); 
    return user;
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.remoteDataSource.login(email, password);
    await AuthLocalDataSource.saveUser(user); 
    return user;
  }

  async logout(): Promise<void> {
    await this.remoteDataSource.logout();
    await AuthLocalDataSource.clear(); 
  }

  async getCurrentUser(): Promise<User | null> {
    const localUser = await AuthLocalDataSource.getUser();
    if (localUser) return localUser; 

    return this.remoteDataSource.getCurrentUser(); 
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return this.remoteDataSource.onAuthStateChanged(async (user) => {
      if (user) {
        await AuthLocalDataSource.saveUser(user); 
      } else {
        await AuthLocalDataSource.clear();
      }
      callback(user);
    });
  }

  // 🔹 Método updateProfile corregido
  async updateProfile(displayName: string): Promise<void> {
    // 1️⃣ Actualiza en Firebase Auth y Firestore
    await this.remoteDataSource.updateProfile(displayName);

    // 2️⃣ Actualiza en local storage si hay usuario
    const localUser = await AuthLocalDataSource.getUser();
    if (localUser) {
      const updatedUser = { ...localUser, displayName }; // solo actualizar displayName
      await AuthLocalDataSource.saveUser(updatedUser);
    }
  }
}
