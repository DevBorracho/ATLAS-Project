import type { Request, Response } from "express";
import { Router } from "express";
import { RegisterController } from "../controllers/registerController";
import { createUserService } from "../../../application/services/createUserService";
import { findByEmail } from "../../../application/services/findByEmailService";
import { PasswordHashingService } from "../../../application/services/hashingCompare/passwordHashingService";
import { bcryptService } from "../../../../shared/services/bcryptService";
import { UserRepositoryPrisma } from "../../repositories/userRepositoryPrisma";
import type { MyRequest } from "../../../../shared/types/myRequest";

const router = Router();

// Instanciar las dependencias
const passwordHashImplementor = new bcryptService();
const userRepository = new UserRepositoryPrisma();
const passwordService = new PasswordHashingService(passwordHashImplementor);
const findByEmailService = new findByEmail(userRepository);
const createUserServiceInstance = new createUserService(userRepository);
const registerController = new RegisterController(
  createUserServiceInstance,
  findByEmailService,
  passwordService
);

// Ruta de registro
router.post("/register", (req: Request, res: Response) =>
  registerController.execute(req as MyRequest, res)
);

export default router;
