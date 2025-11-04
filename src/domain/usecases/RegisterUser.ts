import { AuthRepository } from "../repositories/AuthRepository"; 
import { User } from "../entities/User";

export class RegisterUser {
  constructor(private authRepository: AuthRepository) {}

  async execute( 
    email: string, 
    password: string, 
    displayName: string
  ): Promise<User> {
    // ===== VALIDACIONES BÁSICAS =====
    if (!email || !password || !displayName) {
      throw new Error("Todos los campos son requeridos");
    }

    if (password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    if (displayName.trim().length < 2) {
      throw new Error("El nombre debe tener al menos 2 caracteres");
    }

    // ===== VALIDACIÓN DE EMAIL =====
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El formato del email no es válido");
    }

    try {
      // Registrar usuario usando AuthRepository
      return await this.authRepository.register(email, password, displayName);
    } catch (error: any) {
      // Capturar error de email ya registrado
      if (error.code === "auth/email-already-in-use") {
        throw new Error("Este email ya está registrado");
      }

      // Propagar otros errores
      throw new Error(error.message || "Error al registrar usuario");
    }
  }
}
