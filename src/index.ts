import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { userRoutes } from "./authentication/infrastructure/http/routes/userRoute";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api", userRoutes);
const PORT: string | number = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`server running in ${PORT} 🚀🚀`);
});
