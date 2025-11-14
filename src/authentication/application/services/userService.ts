//aqui se forjan los usuarios no se implementa los metodos
//sino que se usa todo para forjar los usos de los usuarios
import type IUserRepository from "../../domain/repositories/IUserRepository";
import type IRoleRepository from "../../domain/repositories/IRoleRepository";
import { User } from "../../domain/entities/user";
import type { Role } from "../../domain/entities/role";
import type { PasswordHashService } from "../../domain/services/PasswordHashService";
export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: PasswordHashService,
    private readonly roleRepository: IRoleRepository
  ) {}
  public async createUser(
    username: string,
    email: string,
    password: string,
    roleName: string
  ): Promise<User> {
    const normalizedEmail = email.toLowerCase().trim();
    const existUser = await this.userRepository.findByEmail(normalizedEmail);
    if (existUser) {
      throw new Error("User already exists");
    }
    const role = await this.roleRepository.findByName(roleName);
    if (!role) {
      throw new Error("Role not found");
    }
    const user = await User.create(
      username,
      normalizedEmail,
      password,
      role,
      this.hashService
    );
    return this.userRepository.createUser(user);
  }
  public async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
  public async findByRole(role: Role): Promise<User[] | null> {
    return this.userRepository.findByRole(role);
  }
  public async changePassword(id: string, password: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    if (password.trim().length < 6) {
      throw new Error("Contraseña muy corta");
    }
    const passwordHash = await this.hashService.hash(password);
    return this.userRepository.changePassword(id, passwordHash);
  }
  public async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
  public async changeRole(id: string, role: Role): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return this.userRepository.changeRole(id, role);
  }
}
