import { Router } from "express";
import { insertValue, getValues, updateValue, deleteValue } from "../controllers/wallet.controller.js";
import { validateUpdateValue, validateValue } from "../schemas/joi.schemas.js";
import { validateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .all("/*", validateToken)
  .post("/wallet", validateValue, insertValue)
  .get("/wallet", getValues)
  .put("/wallet/:id", validateUpdateValue, updateValue)
  .delete("/wallet/:id", deleteValue);

export default router;