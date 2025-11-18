import type { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { userID } from "../../domain/valueObjects/userID";
import { userName } from "../../domain/valueObjects/userName";
import { userEmail } from "../../domain/valueObjects/userEmail";
import type { UserRole } from "../../domain/valueObjects/userRole";
import { userPhone } from "../../domain/valueObjects/userPhone";
import { userPassword } from "../../domain/valueObjects/userPassword";

export class createUserService {
  constructor(private userRepository: IUserRepository) {}
  async execute(
    id: string,
    username: string,
    password: string,
    email: string,
    role: UserRole,
    phone: string
  ): Promise<User> {
    const user = new User(
      new userID(id),
      new userName(username),
      new userEmail(email),
      new userPassword(password),
      role,
      true,
      new userPhone(phone),
      new Date()
    );
    return this.userRepository.create(user);
  }
}
