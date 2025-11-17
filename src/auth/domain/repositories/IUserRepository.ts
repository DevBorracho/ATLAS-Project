import type { User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  changePassword(id: string, password: string): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
}
