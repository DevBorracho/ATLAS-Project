// src/types/express/index.d.ts
import type { JwtPayload } from "jsonwebtoken";
import type { JwtUserPayload } from "../auth/userPayload";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}
