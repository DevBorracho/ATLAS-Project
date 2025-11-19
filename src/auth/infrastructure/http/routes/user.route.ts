import type { Request, Response } from "express";
import { Router } from "express";
import { RegisterController } from "../controllers/register.Controller";
import { createUserService } from "../../../application/services/createUser.Service";
import { findByEmail } from "../../../application/services/findByEmail.Service";
import { PasswordHashingService } from "../../../application/services/hashingCompare/passwordHashing.Service";
import { bcryptService } from "../../../../shared/services/bcrypt.Service";
import { UserRepositoryPrisma } from "../../repositories/userRepositoryPrisma";
import { LoginController } from "../controllers/login.Controller";
import { PasswordCompareService } from "../../../application/services/hashingCompare/passwordCompare.Service";
import { LogoutController } from "../controllers/logout.controller";
import { verifyToken } from "../../../../shared/middlewares/auth/verifytoken";
import { FindOneUserController } from "../controllers/findOne.controller";
import { FindAllUserController } from "../controllers/find.controller";
import { findAllUser } from "../../../application/services/findAllUser.Service";
import { findByIdService } from "../../../application/services/findById.Service";

const router = Router();

// Instanciar las dependencias
const passwordHashImplementor = new bcryptService();
const userRepository = new UserRepositoryPrisma();

//create services
const passwordHashService = new PasswordHashingService(passwordHashImplementor);
const passwordCompareService = new PasswordCompareService(
  userRepository,
  passwordHashImplementor
);
const findByEmailService = new findByEmail(userRepository);
const createUserServiceInstance = new createUserService(userRepository);
const findAllServices = new findAllUser(userRepository);
const findOneService = new findByIdService(userRepository);

//create controllers
const registerController = new RegisterController(
  createUserServiceInstance,
  findByEmailService,
  passwordHashService
);
const loginController = new LoginController(
  findByEmailService,
  passwordCompareService
);
const logout = new LogoutController();
const findAllController = new FindAllUserController(findAllServices);
const findOneController = new FindOneUserController(findOneService);

// Ruta de registro
router.post("/register", (req: Request, res: Response) =>
  registerController.execute(req, res)
);
router.post("/login", (req, res) => loginController.execute(req, res));
router.post("/logout", verifyToken, (req, res) => logout.execute(req, res));
router.post("/profile", verifyToken, (req, res) =>
  findOneController.execute(req, res)
);
router.post("/users", verifyToken, (req, res) =>
  findAllController.execute(req, res)
);
//delete
//changePassword

export default router;
