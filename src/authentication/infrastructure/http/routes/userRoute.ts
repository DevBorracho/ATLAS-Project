import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../../../application/services/userService";
import { AuthService } from "../../../application/services/authService";
import { RoleService } from "../../../application/services/roleService";
import UserRepository from "../../repositories/userRepository";
import RoleRepository from "../../repositories/roleRepository";
import JwtServiceImpl from "../../../../shared/services/jwtServiceImpl";
import BcryptHasher from "../../../../shared/services/bcryptService";

const router = Router();

// Inicialización de repositorios
const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

// Inicialización de servicios
const jwtService = new JwtServiceImpl(
  process.env.JWT_SECRET || "your-secret-key"
);
const passwordHasher = new BcryptHasher(10);

const authService = new AuthService(userRepository, passwordHasher, jwtService);

const userService = new UserService(
  userRepository,
  passwordHasher,
  roleRepository
);
const roleService = new RoleService(roleRepository);

// Inicialización del controlador
const userController = new UserController(userService, roleService);

// Rutas de autenticación
router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));

// Rutas de usuario (protegidas)
router.get("/profile", (req, res) => {
  // Implementar middleware de autenticación
  res
    .status(501)
    .json({ message: "Perfil de usuario (pendiente implementar)" });
});

// Rutas de administración (solo para administradores)
router.post("/roles", (req, res) => {
  // Implementar middleware de autorización
  res.status(501).json({ message: "Crear rol (pendiente implementar)" });
});

export const userRoutes = router;
