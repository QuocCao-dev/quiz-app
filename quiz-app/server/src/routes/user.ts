import { Router } from "express";

import validateSchema from "../middleware/validation-schema";
import {
  getUserInfoHandler,
  loginHandler,
  registerHandler,
} from "../handler/user";
import { loginSchema, registerSchema } from "../schema/user";
import auth from "../middleware/auth";

const router = Router();

router.post("/register", validateSchema(registerSchema), registerHandler);
router.post("/login", validateSchema(loginSchema), loginHandler);
router.post("/me", auth, getUserInfoHandler);

export default router;
