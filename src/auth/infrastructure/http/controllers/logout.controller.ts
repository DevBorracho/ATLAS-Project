import type { Response, Request } from "express";

export class LogoutController {
  execute(req: Request, res: Response): Response {
    res.clearCookie("token");
    return res.json({ msg: "logout exitoso" });
  }
}
