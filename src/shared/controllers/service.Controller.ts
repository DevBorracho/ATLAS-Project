import { changePasswordService } from "../../auth/application/services/changePassword.Service";
import { createUserService } from "../../auth/application/services/createUser.Service";
import { deleteUserService } from "../../auth/application/services/deleteUser.Service";
import { findAllUser } from "../../auth/application/services/findAllUser.Service";
import { findByEmail } from "../../auth/application/services/findByEmail.Service";
import { findByIdService } from "../../auth/application/services/findById.Service";
import { PasswordCompareService } from "../../auth/application/services/hashingCompare/passwordCompare.Service";
import { PasswordHashingService } from "../../auth/application/services/hashingCompare/passwordHashing.Service";
import { UserRepositoryPrisma } from "../../auth/infrastructure/repositories/userRepositoryPrisma";
import { bcryptService } from "../services/bcrypt.Service";
const userRepository = new UserRepositoryPrisma();
const passwordRepository = new bcryptService();
export const ServiceController = {
  user: {
    findByEmail: new findByEmail(userRepository),
    findById: new findByIdService(userRepository),
    createUser: new createUserService(userRepository),
    findAll: new findAllUser(userRepository),
    deleteUser: new deleteUserService(userRepository),
    changePassword: new changePasswordService(userRepository),
    passwordHash: new PasswordHashingService(passwordRepository),
    passwordCompare: new PasswordCompareService(
      userRepository,
      passwordRepository
    ),
  },
};
