import { z } from "zod";

export const BasicExamSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  duration: z.number(),
  category: z.string().nonempty({ message: "Category is required" }),
  totalMarks: z.number(),
  passingMarks: z.number()
});
export const BasicQuestionSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),

  correctOption: z.string().nonempty({ message: "Category is required" }),
  options: z.array(z.string()).nonempty({ message: "TotalMarks is required" }),
  examId: z.number()
});
const HasIdExam = z.object({ id: z.number().int().positive().optional() });
const HasIdQues = z.object({ id: z.number().int().positive().optional() });

export const ExamSchema = BasicExamSchema.merge(HasIdExam);
export type exam = z.infer<typeof ExamSchema>;
export const QuestionSchema = BasicQuestionSchema.merge(HasIdQues);

export type question = z.infer<typeof QuestionSchema>;
