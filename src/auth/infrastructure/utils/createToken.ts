import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const createToken = async (payload: JwtPayload): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "myawesomeSecret",
      {
        expiresIn: "1d",
      },
      (err, data) => {
        if (err) {
          reject(err);
        }
        if (data) {
          resolve(data);
        }
      }
    );
  });
};
