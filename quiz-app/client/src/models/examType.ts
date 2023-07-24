import { z } from "zod";

export const BasicExamSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  duration: z.number(),
  category: z.string().nonempty({ message: "Category is required" }),
  totalMarks: z.number(),
  passingMarks: z.number(),
});
export const BasicQuestionSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),

  correctOption: z.string().nonempty({ message: "Category is required" }),
  options: z.array(z.object({optionOne: z.string().nonempty({ message: "option is required" }),optionTwo: z.string().nonempty({ message: "option is required" })}
  )).nonempty({ message: "TotalMarks is required" }),
  examId: z.number(),
});
const HasIdExam = z.object({ id: z.number().int().positive().optional() });
const HasIdQues = z.object({ id: z.number().int().positive().optional() });

export const examSchema = BasicExamSchema.merge(HasIdExam);
export type Exam = z.infer<typeof examSchema>;
export const questionSchema =
  BasicQuestionSchema.merge(HasIdQues).merge(HasIdExam);

export type Question = z.infer<typeof questionSchema>;
