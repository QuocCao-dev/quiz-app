import { Router } from "express";
import auth from "../middleware/auth";

const router = Router();

router.route("/").post(auth);

export default router;
