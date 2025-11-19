import type { UserRole } from "../../../auth/domain/valueObjects/userRole";

export interface JwtUserPayload {
  id: string; // o number, depende de tu DB
  role: UserRole;
  // lo que tú metas en el token
}
