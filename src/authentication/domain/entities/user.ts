import type { Role } from "./role.ts";
import { randomUUID } from "crypto";
import type { PasswordHashService } from "../services/PasswordHashService.ts";
export class User {
  public readonly id: string;
  public username: string;
  public email: string;
  private password: string;
  public role: Role;
  public createdAt: Date;

  constructor(
    id: string,
    username: string,
    email: string,
    password: string,
    role: Role
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
  }
  getRoleName(): string {
    return this.role.name;
  }
  getPassword(): string {
    return this.password;
  }
  async verifyPassword(
    plainPassword: string,
    hashService: PasswordHashService
  ): Promise<boolean> {
    return hashService.compare(plainPassword, this.password);
  }

  static async create(
    username: string,
    email: string,
    plainPassword: string,
    role: Role,
    hashService: PasswordHashService
  ): Promise<User> {
    if (!email.trim().includes("@")) {
      throw new Error("Email inválido");
    }
    if (plainPassword.trim().length < 6) {
      throw new Error("Contraseña muy corta");
    }

    const passwordHash = await hashService.hash(plainPassword);

    // ✅ Si el dominio controla los UUID:
    const id = randomUUID();

    return new User(id, username, email, passwordHash, role);
  }
}
