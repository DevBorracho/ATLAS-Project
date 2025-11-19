import type { Request, Response } from "express";
import type { findAllUser } from "../../../application/services/findAllUser.Service";
import { UserRole } from "../../../domain/valueObjects/userRole";
export class FindAllUserController {
  constructor(private userFindAllService: findAllUser) {}
  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const role = req.user?.role;
      if (role !== UserRole.ADMIN) {
        return res.status(401).json({
          message: "no tienes authorizacion para ver a los usuarios existentes",
        });
      }
      const users = await this.userFindAllService.execute();
      if (!users || users.length === 0) {
        return res.status(404).json({ msg: "no hay usuarios" });
      }
      const userFormated = users.map(user => ({
        id: user.id.value,
        username: user.username.value,
        email: user.email.value,
        role: user.Role,
        phone: user.phone.value,
        createAt: user.createdAt,
      }));
      return res.json(userFormated);
    } catch (error) {
      return res.status(500).json({ msg: "error al buscar" });
    }
  }
}
