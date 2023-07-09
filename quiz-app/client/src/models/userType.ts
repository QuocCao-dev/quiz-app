import { z } from "zod";

export const BasicUserSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

const HasID = z.object({ id: z.number().int().positive().optional() });
const HasName = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
});
export const UserSchema = BasicUserSchema.merge(HasID);
export type user = z.infer<typeof UserSchema>;
export const RegisterUserSchema = BasicUserSchema.merge(HasName);
export const RegisterUserWithIdSchema = RegisterUserSchema.merge(HasID);
export type registerUser = z.infer<typeof RegisterUserSchema>;
export type existingUser = z.infer<typeof RegisterUserWithIdSchema>;
