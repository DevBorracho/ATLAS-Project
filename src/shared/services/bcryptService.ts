import bcrypt from "bcryptjs";
import type { IPasswordRepository } from "../../auth/domain/repositories/IPasswordRepository";

export class bcryptService implements IPasswordRepository {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, Number(process.env.SALT) || 10);
  }
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
