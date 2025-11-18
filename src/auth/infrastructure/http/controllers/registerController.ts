import type { Response } from "express";
import type { MyRequest } from "../../../../shared/types/myRequest";
import type { createUserService } from "../../../application/services/createUserService";
import type { PasswordHashingService } from "../../../application/services/hashingCompare/passwordHashingService";
import { UserRole } from "../../../domain/valueObjects/userRole";

import type { findByEmail } from "../../../application/services/findByEmailService";
import { createToken } from "../../utils/createToken";
interface RegisterBody {
  username: string;
  password: string;
  email: string;
  phone: string;
}
export class RegisterController {
  constructor(
    private createUserService: createUserService,
    private findByEmailService: findByEmail,
    private passwordService: PasswordHashingService
  ) {}
  async execute(req: MyRequest, res: Response): Promise<Response> {
    try {
      const { username, email, password, phone }: RegisterBody = req.body;
      if (!username || !email || !password || !phone) {
        return res.status(400).json({ msg: "los campos son requeridos" });
      }

      // Verificar si el email ya existe (sin lanzar error si no existe)
      const userfound = await this.findByEmailService.execute(email, false);
      if (userfound) {
        return res
          .status(400)
          .json({ msg: "El correo electrónico ya está registrado" });
      }
      const passwordHash = await this.passwordService.execute(password);
      const user = await this.createUserService.execute(
        "",
        username,
        passwordHash,
        email,
        UserRole.ADMIN,
        phone
      );
      const token = await createToken({ id: user.id.value, role: user.Role });
      res.cookie("token", token);
      const returnUser = {
        id: user.id.value,
        username: user.username.value,
        email: user.email.value,
        role: user.Role,
        phone: user.phone.value,
        createAt: user.createdAt,
      };
      return res.status(201).json(returnUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: error });
    }
  }
}
