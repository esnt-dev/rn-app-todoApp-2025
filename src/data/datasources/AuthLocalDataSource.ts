import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/src/domain/entities/User";

export default class AuthLocalDataSource {
  private static readonly KEY = "AUTH_USER";

  static async saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(this.KEY, JSON.stringify(user));
  }

  static async getUser(): Promise<User | null> {
    const json = await AsyncStorage.getItem(this.KEY);
    return json ? JSON.parse(json) : null;
  }

  static async clear(): Promise<void> {
    await AsyncStorage.removeItem(this.KEY);
  }
}

