import type { Role } from "../entities/role.ts";
import type { User } from "../entities/user.ts";

interface IUserRepository {
  createUser(user: User): Promise<User>;
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByRole(role: Role): Promise<User[] | null>;
  changePassword(id: string, password: string): Promise<void>;
  delete(id: string): Promise<void>;
  changeRole(id: string, role: Role): Promise<void>;
}
export default IUserRepository;
