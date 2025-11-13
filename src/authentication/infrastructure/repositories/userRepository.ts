import { PrismaClient } from "../../../../prisma/generated/prisma/client";
import { User } from "../../domain/entities/user";
import { Role } from "../../domain/entities/role";
import type IUserRepository from "../../domain/repositories/IUserRepository";

const prisma = new PrismaClient();
export default class UserRepository implements IUserRepository {
  public async createUser(user: User): Promise<User> {
    const created = await prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.getPassword(),
        roleId: user.role.id, // suponiendo que role también es una entidad
      },
      include: {
        role: true,
      },
    });
    const role = new Role(
      created.role.id,
      created.role.name,
      created.role.level,
      created.role.description
    );
    return new User(
      created.id,
      created.username,
      created.email,
      created.password,
      role
    );
    // Devuelves una nueva instancia del dominio (no un raw Prisma object)
  }

  public async save(user: User): Promise<void> {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: user.username,
        email: user.email,
        password: user.getPassword(),
        roleId: user.role.id,
      },
    });
  }
  public async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        role: true,
      },
    });
    if (!user) {
      return null;
    }
    const role = new Role(
      user.role.id,
      user.role.name,
      user.role.level,
      user.role.description
    );
    return new User(user.id, user.username, user.email, user.password, role);
  }
  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        role: true,
      },
    });
    if (!user) {
      return null;
    }
    const role = new Role(
      user.role.id,
      user.role.name,
      user.role.level,
      user.role.description
    );
    return new User(user.id, user.username, user.email, user.password, role);
  }
  public async findByRole(role: Role): Promise<User[] | null> {
    const users = await prisma.user.findMany({
      where: {
        roleId: role.id,
      },
      include: {
        role: true,
      },
    });
    if (!users) {
      return null;
    }

    return users.map(user => {
      return new User(
        user.id,
        user.username,
        user.email,
        user.password,
        new Role(
          user.role.id,
          user.role.name,
          user.role.level,
          user.role.description
        )
      );
    });
  }
  public async changePassword(id: string, password: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });
  }
  public async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
  public async changeRole(id: string, role: Role): Promise<void> {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        roleId: role.id,
      },
    });
  }
}
