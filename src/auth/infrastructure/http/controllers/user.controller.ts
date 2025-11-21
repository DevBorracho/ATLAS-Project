import type { Request, Response } from "express";
import { ServiceController } from "../../../../shared/controllers/service.Controller";
import { UserRole } from "../../../domain/valueObjects/userRole";
import { createToken } from "../../utils/createToken";
import { NotFoundError } from "../../../domain/userErrors/notFoundError";
interface UserBody {
  username: string;
  email: string;
  password: string;
  phone: string;
}
export class UserController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password, phone }: UserBody = req.body;

      const userFound = await ServiceController.user.findByEmail.execute(email);
      if (userFound) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }
      const passwordHash = await ServiceController.user.passwordHash.execute(
        password
      );
      const user = await ServiceController.user.createUser.execute(
        "",
        username,
        passwordHash,
        email,
        UserRole.USER,
        phone
      );
      const token = await createToken({ id: user.id.value, role: user.Role });
      const userReturn = {
        id: user.id.value,
        username: user.username.value,
        email: user.email.value,
        password: user.password.value,
        createAt: user.createdAt,
        Role: user.Role,
        actived: user.actived,
        phone: user.phone.value,
      };
      res.cookie("token", token);
      res.json(userReturn);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password }: UserBody = req.body;
      const user = await ServiceController.user.findByEmail.execute(email);
      const match = await ServiceController.user.passwordCompare.execute(
        user?.id.value as string,
        password
      );
      if (!user) {
        res.status(404).json("email invalido");
      }
      if (!match) {
        res.status(400).json({ message: "la contrasena no coincide" });
      }

      const userReturn = {
        id: user?.id.value,
        username: user?.username.value,
        email: user?.email.value,
        password: user?.password.value,
        createAt: user?.createdAt,
        Role: user?.Role,
        actived: user?.actived,
        phone: user?.phone.value,
      };
      const token = await createToken({ id: user?.id.value, role: user?.Role });
      res.cookie("token", token);
      return res.json(userReturn);
    } catch (error) {
      return res.status(500).json({ message: "error del server" });
    }
  }
  logout(req: Request, res: Response) {
    res.clearCookie("token");
    return res.json({ message: "cession cerrada correctamente" });
  }
  async findAll(req: Request, res: Response) {
    const role = req.user?.role;
    if (role !== UserRole.ADMIN) {
      return res
        .status(401)
        .json({ message: "no estas autorizado para esta busqueda" });
    }
    const users = await ServiceController.user.findAll.execute();
    const userReturn = users.map(user => ({
      id: user.id.value,
      username: user.username.value,
      email: user.email.value,
      password: user.password.value,
      createAt: user.createdAt,
      actived: user.actived,
      Role: user.Role,
      phone: user.phone.value,
    }));
    return res.json(userReturn);
  }
  async profile(req: Request, res: Response) {
    const id = req.user?.id;
    try {
      const user = await ServiceController.user.findById.execute(id as string);
      if (!user) {
        return res.status(404).json({ msg: "el usuario no existe" });
      }
      const userReturn = {
        id: user.id.value,
        username: user.username.value,
        email: user.email.value,
        password: user.password.value,
        createAt: user.createdAt,
        actived: user.actived,
        Role: user.Role,
        phone: user.phone.value,
      };
      return res.json(userReturn);
    } catch (error) {
      return res.status(500).json({ msg: "ups" });
    }
  }
  async findUserById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const role = req.user?.role;
      if (role !== UserRole.ADMIN) {
        return res
          .status(401)
          .json({ message: "no estas autorizado para esta busqueda" });
      }
      const user = await ServiceController.user.findById.execute(id as string);
      if (!user) {
        return res.status(404).json({ msg: "el usuario no existe" });
      }
      const userReturn = {
        id: user.id.value,
        username: user.username.value,
        email: user.email.value,
        password: user.password.value,
        createAt: user.createdAt,
        Role: user.Role,
        actived: user.actived,
        phone: user.phone.value,
      };
      return res.json(userReturn);
    } catch (error) {
      return res.status(500).json({ msg: "ups" });
    }
  }
  async changePassword(req: Request, res: Response) {
    const id = req.user?.id;
    try {
      const { password, newpassword } = req.body;
      const passwordMatch =
        await ServiceController.user.passwordCompare.execute(
          id as string,
          password as string
        );
      if (!passwordMatch) {
        return res.status(400).json({ msg: "la contrasena no coincide" });
      }
      const newpasswordHash = await ServiceController.user.passwordHash.execute(
        newpassword as string
      );
      await ServiceController.user.changePassword.execute(
        id as string,
        newpasswordHash
      );
      return res.json({ msg: "contrasena cambiada correctamente" });
    } catch (error) {
      return res.status(500).json({ msg: "ups" });
    }
  }
  async deleteUser(req: Request, res: Response) {
    const id = req.user?.id;
    try {
      const role = req.user?.role;
      if (role !== UserRole.ADMIN) {
        return res
          .status(401)
          .json({ message: "no estas autorizado para esta busqueda" });
      }
      await ServiceController.user.deleteUser.execute(id as string);
      return res.json({ msg: "usuario eliminado correctamente" });
    } catch (error) {
      return res.status(500).json({ msg: "ups" });
    }
  }
}
