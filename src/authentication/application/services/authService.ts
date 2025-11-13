import type IUserRepository from "../../domain/repositories/IUserRepository";
import type { PasswordHashService } from "../../domain/services/PasswordHashService";
import type { JwtService } from "../../domain/services/JwtService";
import type IRefreshTokenRepository from "../../domain/repositories/IRefreshTokenRepository";
import type { User } from "../../domain/entities/user";

export default class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: PasswordHashService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository?: IRefreshTokenRepository
  ) {}

  public async login(
    email: string,
    password: string
  ): Promise<{ user: User; accessToken: string; refreshToken?: string }> {
    const normalizedEmail = email.toLowerCase().trim();
    const user: User | null = await this.userRepository.findByEmail(
      normalizedEmail
    );
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await user.verifyPassword(password, this.hashService);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const payload = { sub: user.id, role: user.role.name };
    const accessToken = this.jwtService.sign(payload, { expiresIn: "15m" });

    let refreshToken: string | undefined;
    if (this.refreshTokenRepository) {
      refreshToken = this.jwtService.sign(
        { sub: user.id, type: "refresh" },
        { expiresIn: "7d" }
      );
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await this.refreshTokenRepository.save(user.id, refreshToken, expiresAt);
    }

    return { user, accessToken, refreshToken };
  }

  public async logout(userId: string, refreshToken?: string): Promise<void> {
    if (!this.refreshTokenRepository) {
      return;
    }
    if (refreshToken) {
      await this.refreshTokenRepository.revoke(refreshToken);
      return;
    }
    await this.refreshTokenRepository.revokeAllForUser(userId);
  }
}
