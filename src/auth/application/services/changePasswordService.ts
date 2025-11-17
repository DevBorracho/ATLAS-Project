import type { IUserRepository } from "../../domain/repositories/IUserRepository";

export class changePasswordService {
  constructor(private userRepository: IUserRepository) {}
  async execute(id: string, password: string): Promise<void> {
    await this.userRepository.findById(id);

    await this.userRepository.changePassword(id, password);
  }
}
