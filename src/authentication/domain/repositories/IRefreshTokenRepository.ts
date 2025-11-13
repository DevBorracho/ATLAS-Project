export interface IRefreshTokenRepository {
  save(userId: string, token: string, expiresAt: Date): Promise<void>;
  revoke(token: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
  findValid(userId: string, token: string): Promise<{ userId: string; token: string; expiresAt: Date } | null>;
}
export default IRefreshTokenRepository;
