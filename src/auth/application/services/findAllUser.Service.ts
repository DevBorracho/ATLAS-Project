import type { User } from "../../domain/entities/User.ts";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.ts";

export class findAllUser {
  constructor(private userRepository: IUserRepository) {}
  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
