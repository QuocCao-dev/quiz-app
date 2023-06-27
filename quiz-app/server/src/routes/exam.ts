import { Router } from "express";
import auth from "../middleware/auth";

import validateSchema from "../middleware/validation-schema";
import { createExamSchema, getExamByIdSchema } from "../schema/exam";
import {
  createExamHandler,
  deleteExamByIdHandler,
  getExamByIdHandler,
  getExamsHandler,
  updateExamByIdHandler,
} from "../handler/exam";

const router = Router();

router
  .route("/")
  .get(auth, getExamsHandler)
  .post(auth, validateSchema(createExamSchema), createExamHandler);

router
  .route("/:id")
  .get(auth, validateSchema(getExamByIdSchema), getExamByIdHandler)
  .patch(auth, updateExamByIdHandler)
  .delete(auth, deleteExamByIdHandler);

export default router;
