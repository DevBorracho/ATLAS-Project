import type { IUserRepository } from "../../domain/repositories/IUserRepository";
import { NotFoundError } from "../../domain/userErrors/notFoundError";
import type { User } from "../../domain/entities/User";

export class findByIdService {
  constructor(private userRepository: IUserRepository) {}
  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError();
    }
    return user;
  }
}
