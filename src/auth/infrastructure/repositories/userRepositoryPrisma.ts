import { client } from "../../../shared/services/prisma/cliente.ts";
import { User } from "../../domain/entities/User";
import type { IUserRepository } from "../../domain/repositories/IUserRepository";
import { userEmail } from "../../domain/valueObjects/userEmail.ts";
import { userID } from "../../domain/valueObjects/userID.ts";
import { userName } from "../../domain/valueObjects/userName.ts";
import { userPassword } from "../../domain/valueObjects/userPassword.ts";
import { userPhone } from "../../domain/valueObjects/userPhone.ts";
import type { UserRole } from "../../domain/valueObjects/userRole.ts";
import { NotFoundError } from "../../domain/userErrors/notFoundError.ts";
const prisma = client;

export class UserRepositoryPrisma implements IUserRepository {
  constructor() {}

  async create(user: User): Promise<User> {
    const userCreated = await prisma.user.create({
      data: {
        username: user.username.value,
        email: user.email.value,
        password: user.password.value,
        phone: user.phone.value,
        role: user.Role,
      },
    });
    return new User(
      new userID(userCreated.id),
      new userName(userCreated.username),
      new userEmail(userCreated.email),
      new userPassword(userCreated.password),
      userCreated.role as UserRole,
      userCreated.actived,
      new userPhone(userCreated.phone),
      userCreated.createdAt
    );
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundError();
    }
    const newUser = new User(
      new userID(user.id),
      new userName(user.username),
      new userEmail(user.email),
      new userPassword(user.password),
      user.role as UserRole,
      user.actived,
      new userPhone(user.phone),
      user.createdAt
    );
    return newUser;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    const newUser = new User(
      new userID(user.id),
      new userName(user.username),
      new userEmail(user.email),
      new userPassword(user.password),
      user.role as UserRole,
      user.actived,
      new userPhone(user.phone),
      user.createdAt
    );
    return newUser;
  }
  async changePassword(id: string, password: string): Promise<void> {
    await prisma.user.update({ where: { id }, data: { password } });
  }
  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(
      user =>
        new User(
          new userID(user.id),
          new userName(user.username),
          new userEmail(user.email),
          new userPassword(user.password),
          user.role as UserRole,
          user.actived,
          new userPhone(user.phone),
          user.createdAt
        )
    );
  }
}
