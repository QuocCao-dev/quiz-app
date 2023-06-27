import { z } from "zod";

export type CreateExamSchema = z.infer<typeof createExamSchema>;
export type CreateExamSchemaBody = CreateExamSchema["body"];

export const createExamSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(255),
    duration: z.number().min(1).max(180).default(60),
    category: z.string().min(3).max(255),
    totalMarks: z.number().min(1).max(100).default(100),
    passingMarks: z.number().min(1).max(100).default(60),
  }),
});

export type GetExamByIdSchema = z.infer<typeof getExamByIdSchema>;
export type GetExamByIdSchemaParams = GetExamByIdSchema["params"];

export const getExamByIdSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Exam id is required",
    }),
  }),
});
