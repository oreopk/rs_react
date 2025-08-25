import * as z from "zod";

export const formSchema = z
  .object({
    name: z.string().min(2),
    age: z.number().int().min(1).max(100),
    email: z.email(),
    password1: z.string().min(6),
    password2: z.string().min(6),
    gender: z.enum(["male", "female"]),
    country: z.string().min(1),
    terms: z.literal(true),
  })
  .refine((val) => val.password1 === val.password2, {
    path: ["password2"],
    message: "Passwords are not equal",
  });

export type FormFields = z.infer<typeof formSchema>;
