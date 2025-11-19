import type { Request, Response } from "express";
import type { findByIdService } from "../../../application/services/findById.Service";
export class FindOneUserController {
  constructor(private userFindService: findByIdService) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.user?.id;
      const user = await this.userFindService.execute(id as string);
      if (!user) {
        return res.status(404).json({ msg: "el usuario no existe" });
      }
      return res.json({
        id: user.id.value,
        username: user.username.value,
        email: user.email.value,
        role: user.Role,
        phone: user.phone.value,
        createAt: user.createdAt,
      });
    } catch (error) {
      return res.status(500).json({ msg: "error al buscar" });
    }
  }
}
