import type { User } from "../../domain/entities/User.ts";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.ts";
import { NotFoundError } from "../../domain/userErrors/notFoundError.ts";
import { RequiredError } from "../../domain/userErrors/requiredError.ts";

export class findByEmail {
  constructor(private userRepository: IUserRepository) {}
  async execute(email: string): Promise<User> {
    if (!email) {
      throw new RequiredError("email");
    }
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError();
    }
    return user;
  }
}
