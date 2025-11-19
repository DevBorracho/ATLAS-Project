import type { Response, Request } from "express";

import type { findByEmail } from "../../../application/services/findByEmail.Service";
import { createToken } from "../../utils/createToken";
import type { PasswordCompareService } from "../../../application/services/hashingCompare/passwordCompare.Service";
import { NotFoundError } from "../../../domain/userErrors/notFoundError";
interface RegisterBody {
  password: string;
  email: string;
}
export class LoginController {
  constructor(
    private findByEmailService: findByEmail,
    private passwordService: PasswordCompareService
  ) {}
  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password }: RegisterBody = req.body;
      if (!email || !password) {
        return res.status(400).json({ msg: "los campos son requeridos" });
      }

      const userfound = await this.findByEmailService.execute(email);
      if (!userfound) {
        return res.status(404).json({ msg: NotFoundError });
      }
      const match = await this.passwordService.execute(
        userfound.id.value as string,
        password
      );
      if (!match) {
        return res.status(400).json({ msg: "password invalida" });
      }
      const token = await createToken({
        id: userfound.id.value,
        role: userfound.Role,
      });
      res.cookie("token", token);
      const returnUser = {
        id: userfound.id.value,
        username: userfound.username.value,
        email: userfound.email.value,
        role: userfound.Role,
        phone: userfound.phone.value,
        createAt: userfound.createdAt,
      };
      return res.json(returnUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: error });
    }
  }
}
