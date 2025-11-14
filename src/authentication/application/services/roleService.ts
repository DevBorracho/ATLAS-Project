import { randomUUID } from "crypto";
import { Role } from "../../domain/entities/role";
import type { RoleRepository } from "../../domain/repositories/IRoleRepository";

export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async findByName(name: string): Promise<Role | null> {
    try {
      const role = await this.roleRepository.findByName(name);
      if (!role) {
        return null;
      }
      // Aseguramos que el rol tenga la estructura correcta
      if (role instanceof Role) {
        return role;
      }
      // Si por alguna razón no es una instancia de Role, lanzamos un error
      throw new Error("Formato de rol inválido");
    } catch (error) {
      console.error("Error finding role by name:", error);
      // Lanzamos un nuevo error con la información del error original
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      throw new Error(`Error al buscar el rol: ${errorMessage}`);
    }
  }

  public async createRole(
    name: string,
    level: string,
    description: string
  ): Promise<Role> {
    try {
      // Validación básica
      if (!name?.trim() || typeof level !== "number" || !description?.trim()) {
        throw new Error(
          "Datos del rol inválidos. Se requieren nombre, nivel y descripción."
        );
      }

      // Validación adicional del nivel
      if (level < 1) {
        throw new Error("El nivel debe ser un número positivo");
      }

      const role = new Role(
        randomUUID(),
        name.trim(),
        level,
        description.trim()
      );

      const createdRole = await this.roleRepository.createRole(role);

      // Verificación del rol creado
      if (!createdRole || !(createdRole instanceof Role)) {
        throw new Error("No se pudo crear el rol correctamente");
      }

      // Devolvemos una nueva instancia para asegurar la integridad de los datos
      return new Role(
        createdRole.id,
        createdRole.name,
        createdRole.level,
        createdRole.description
      );
    } catch (error) {
      console.error("Error creating role:", error);
      throw new Error("Error al crear el rol");
    }
  }
}
