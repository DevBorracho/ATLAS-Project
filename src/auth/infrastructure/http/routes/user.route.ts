import type { Request, Response } from "express";
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../../../../shared/middlewares/auth/verifytoken";
const router = Router();
const userController = new UserController();
router.post("/register", (req: Request, res: Response) =>
  userController.register(req, res)
);
router.post("/login", (req: Request, res: Response) =>
  userController.login(req, res)
);
router.post("/logout", verifyToken, (req: Request, res: Response) =>
  userController.logout(req, res)
);
router.get("/", verifyToken, (req: Request, res: Response) =>
  userController.findAll(req, res)
);
router.get("/profile", verifyToken, (req: Request, res: Response) =>
  userController.profile(req, res)
);
router.get("/:id", verifyToken, (req: Request, res: Response) =>
  userController.findUserById(req, res)
);
router.delete("/:id", verifyToken, (req: Request, res: Response) =>
  userController.deleteUser(req, res)
);
router.post("/change-password", verifyToken, (req: Request, res: Response) =>
  userController.changePassword(req, res)
);
export default router;
