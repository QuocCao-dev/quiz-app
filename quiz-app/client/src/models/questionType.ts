import { z } from "zod";

export const BasicQuestionSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),

  correctOption: z.string().nonempty({ message: "Category is required" }),
  options: z.array(z.string()).nonempty({ message: "TotalMarks is required" }),
  examId: z.number(),
});
const HasIdExam = z.object({ id: z.number().int().positive().optional() });
const HasIdQues = z.object({ id: z.number().int().positive().optional() });

export const QuestionSchema = BasicQuestionSchema.merge(HasIdQues);

export type question = z.infer<typeof QuestionSchema>;
