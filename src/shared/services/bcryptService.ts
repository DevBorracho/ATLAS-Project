import { hash, compare } from "bcrypt";
import { PasswordHashService } from "../../authentication/domain/services/PasswordHashService";

export class BcryptHasher implements PasswordHashService {
  constructor(private readonly saltRounds: number) {}

  public async hash(password: string): Promise<string> {
    return hash(password, this.saltRounds);
  }

  public async compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}

export default BcryptHasher;
