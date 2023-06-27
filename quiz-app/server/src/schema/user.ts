import { z } from "zod";

export type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterSchemaBody = RegisterSchema["body"];

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    name: z.string({ required_error: "Name is required" }).min(3).max(255),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long")
      .max(255, "Password must be at most 255 characters long"),
    isAdmin: z.boolean().optional(),
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginSchemaBody = LoginSchema["body"];
export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
