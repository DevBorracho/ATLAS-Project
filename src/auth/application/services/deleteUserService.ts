import type { IUserRepository } from "../../domain/repositories/IUserRepository";

export class deleteUserService {
  constructor(private userRepository: IUserRepository) {}
  async execute(id: string): Promise<void> {
    await this.userRepository.findById(id);

    await this.userRepository.delete(id);
  }
}
