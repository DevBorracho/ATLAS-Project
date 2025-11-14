import type { Request, Response } from "express";
import type { UserService, RoleService } from "../../../application/services";
import type { Role } from "../../../domain/entities/role";

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  roleName: string;
}

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) {}

  public async register(
    req: Request<unknown, unknown, RegisterRequest>,
    res: Response
  ): Promise<void> {
    try {
      const { username, email, password, roleName } = req.body;

      // Validación de entrada
      if (
        !username?.trim() ||
        !email?.trim() ||
        !password ||
        !roleName?.trim()
      ) {
        res.status(400).json({
          success: false,
          error: "Todos los campos son requeridos",
        });
        return;
      }

      // Verificar si el rol existe
      const role: Role | null = await this.roleService.findByName(roleName);
      if (!role) {
        res.status(400).json({
          success: false,
          error: `El rol '${roleName}' no existe`,
        });
        return;
      }

      // Crear el usuario
      const user = await this.userService.createUser(
        username.trim(),
        email.toLowerCase().trim(),
        password,
        roleName
      );

      // No devolver la contraseña en la respuesta
      const userResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      res.status(201).json({
        success: true,
        data: userResponse,
      });
    } catch (error: unknown) {
      console.error("Error en el registro:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";

      // Manejar errores de validación
      if (errorMessage.includes("ya existe")) {
        res.status(409).json({
          success: false,
          error: errorMessage,
        });
      } else {
        res.status(500).json({
          success: false,
          error: `Error al registrar el usuario: ${errorMessage}`,
        });
      }
    }
  }

  // Método de login temporalmente deshabilitado
  public login(_req: Request, res: Response): void {
    res.status(501).json({
      success: false,
      error: "Login no implementado aún",
    });
  }
}
