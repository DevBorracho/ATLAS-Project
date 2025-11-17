import type { userEmail } from "../valueObjects/userEmail";
import type { userID } from "../valueObjects/userID";
import type { userName } from "../valueObjects/userName";
import type { userPassword } from "../valueObjects/userPassword";
import type { userPhone } from "../valueObjects/userPhone";
import type { UserRole } from "../valueObjects/userRole";

export class User {
  id: userID;
  username: userName;
  email: userEmail;
  password: userPassword;
  Role: UserRole;
  actived: boolean;
  phone: userPhone;
  createdAt: Date;
  constructor(
    id: userID,
    username: userName,
    email: userEmail,
    password: userPassword,
    Role: UserRole,
    actived: boolean,
    phone: userPhone,
    createdAt: Date
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.Role = Role;
    this.actived = actived;
    this.phone = phone;
    this.createdAt = createdAt;
  }
}
