import type { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import type { JwtService } from "../../authentication/domain/services/JwtService";

export class JwtServiceImpl implements JwtService {
  constructor(private readonly secret: string) {}

  sign(payload: object, options?: { expiresIn?: string | number }): string {
    const signOptions: SignOptions = {
      ...options,
      algorithm: "HS256",
    };
    return jwt.sign(payload, this.secret, signOptions);
  }

  verify(token: string): object {
    try {
      return jwt.verify(token, this.secret) as object;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
}

export default JwtServiceImpl;
