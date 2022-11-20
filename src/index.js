import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "../src/routes/auth.routes.js";
import walletRoutes from "../src/routes/wallet.routes.js";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => res.send("OK"))
  .use(authRoutes)
  .use(walletRoutes);

app.listen(5000, () => {
    console.log("App is running in port: 5000");
});