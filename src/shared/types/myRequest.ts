import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface MyRequest extends Request {
  user: string | JwtPayload | undefined;
}
