import { Router } from "express";
import auth from "../middleware/auth";
import {
  createQuestionHandler,
  deleteQuestionHandler,
  editQuestionHandler,
} from "../handler/question";

const router = Router();

router.route("/").post(auth, createQuestionHandler);
router
  .route("/:id")
  .patch(auth, editQuestionHandler)
  .delete(auth, deleteQuestionHandler);

export default router;
