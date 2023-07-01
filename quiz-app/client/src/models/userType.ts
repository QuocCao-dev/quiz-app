import { z } from "zod";

export const BasicUserSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  password: z.string().nonempty({ message: "Content is required" }),
  tags: z
    .array(z.object({ title: z.string() }))
    .nonempty({ message: "Tag is required" }),
  // idTagsList: z.array(z.number()),
  deadline: z.string().datetime().nonempty({ message: "Deadline is required" }),
  status: z.boolean().optional(),
});

const HasID = z.object({ id: z.number().int().positive() });
export const TodoSchema = BasicTodoSchema.merge(HasID);
export type Todo = z.infer<typeof TodoSchema>;
export type TodoWithoutId = z.infer<typeof BasicTodoSchema>;

export const BasicTagSchema = z.object({
  title: z.string().nonempty({ message: "Name is required" }),
  color: z.string().nonempty({ message: "Color is required" }),
});
export const todoIdsSchema = z
  .array(z.number())
  .nonempty({ message: "Tag is required" });
export type TagWithoutId = z.infer<typeof BasicTagSchema>;
export const TagSchema = BasicTagSchema.merge(HasID);
export type TagWithId = z.infer<typeof TagSchema>;
