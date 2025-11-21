import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./auth/infrastructure/http/routes/user.route";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRouter);
const PORT: string | number = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`server running in ${PORT} 🚀🚀`);
});
