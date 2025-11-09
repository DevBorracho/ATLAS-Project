import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
app.use(cookieParser());
app.use(express.json());

const PORT: string | number = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`server running in ${PORT} 🚀🚀`);
});
