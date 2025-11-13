import { PrismaClient } from "../../../../prisma/generated/prisma/client";
import { Role } from "../../domain/entities/role";
import type IRoleRepository from "../../domain/repositories/IRoleRepository";

const prisma = new PrismaClient();
export default class RoleRepository implements IRoleRepository {
  public async createRole(role: Role): Promise<Role> {
    const created = await prisma.role.create({
      data: {
        id: role.id,
        name: role.name,
        level: role.level,
        description: role.description,
      },
    });
    return new Role(
      created.id,
      created.name,
      created.level,
      created.description
    );
  }
  public async findByName(name: string): Promise<Role | null> {
    const role = await prisma.role.findFirst({
      where: { name },
    });
    if (!role) {
      return null;
    }
    return new Role(role.id, role.name, role.level, role.description);
  }
}
