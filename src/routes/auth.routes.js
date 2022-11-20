import { Router } from "express";
import { signUp, login } from "../controllers/users.controller.js";
import { validateSignUp, validateLogin } from "../schemas/joi.schemas.js";

const router = Router();

router
  .post("/sign-up", validateSignUp, signUp)
  .post("/login", validateLogin, login);

export default router;