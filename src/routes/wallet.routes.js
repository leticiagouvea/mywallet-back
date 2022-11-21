import { Router } from "express";
import { insertValue, getValues, updateValue } from "../controllers/wallet.controller.js";
import { validateValue } from "../schemas/joi.schemas.js";
import { validateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .all("/*", validateToken)
  .post("/wallet", validateValue, insertValue)
  .get("/wallet", getValues)
  .put("/wallet/:id", validateValue, updateValue);

export default router;