import type { IPasswordRepository } from "../../../domain/repositories/IPasswordRepository.ts";
import { RequiredError } from "../../../domain/userErrors/requiredError.ts";

export class PasswordHashingService {
  constructor(private passwordRepository: IPasswordRepository) {}
  async execute(password: string): Promise<string> {
    if (!password) {
      throw new RequiredError("password");
    }
    return await this.passwordRepository.hashPassword(password);
  }
}
