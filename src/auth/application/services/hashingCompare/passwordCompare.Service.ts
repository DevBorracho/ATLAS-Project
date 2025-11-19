import type { IPasswordRepository } from "../../../domain/repositories/IPasswordRepository.ts";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository.ts";
import { RequiredError } from "../../../domain/userErrors/requiredError.ts";

export class PasswordCompareService {
  constructor(
    private userRepository: IUserRepository,
    private passwordRepository: IPasswordRepository
  ) {}
  async execute(id: string, password: string): Promise<boolean> {
    if (!password) {
      throw new RequiredError("Password");
    }
    const user = await this.userRepository.findById(id);

    return await this.passwordRepository.comparePassword(
      password,
      user?.password.value ?? ""
    );
  }
}
