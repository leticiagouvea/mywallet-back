import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "../src/routes/auth.routes.js";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => res.send("OK"))
  .use(authRouter);

app.listen(5000, () => {
    console.log("App is running in port: 5000");
});