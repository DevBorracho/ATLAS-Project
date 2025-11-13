export interface JwtService {
  sign(payload: object, options?: { expiresIn?: string | number }): string;
  verify(token: string): object;
}
