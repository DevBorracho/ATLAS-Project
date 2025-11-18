import type { Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import type { MyRequest } from "../../types/myRequest";

export const verifyToken = (
  req: MyRequest,
  res: Response,
  next: NextFunction
): string | JwtPayload | undefined => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ msg: "no estas authorizado" });
    }
    const secret = process.env.JWT_SECRET || ("myawesomeSecret" as string);
    jwt.verify(token as string, secret, (err, data) => {
      if (err) {
        return res.status(500).json({ msg: "error al verificar" });
      }
      req.user = data;
      if (req.user === undefined) {
        return res.status(500).json({ msg: "error al verificar" });
      }

      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al validar" });
  }
};
