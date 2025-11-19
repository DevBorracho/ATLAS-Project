import type { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import type { JwtUserPayload } from "../../types/auth/userPayload";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ msg: "no estás autorizado" });
    return;
  }

  const secret = process.env.JWT_SECRET || "myawesomeSecret";

  try {
    // Versión sin callback: devuelve el payload o lanza error
    const decoded = jwt.verify(token as string, secret) as JwtUserPayload;

    req.user = decoded; // aquí ya tienes el payload en tu request
    if (!req.user) {
      res.status(500).json({ msg: "error al verificar" });
      return;
    }

    next(); // sigue al siguiente middleware/controlador
  } catch (err) {
    res.status(401).json({ msg: "token inválido o expirado" });
  }
};
