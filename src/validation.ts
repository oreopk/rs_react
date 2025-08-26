import * as z from "zod";

export const formSchema = z
  .object({
    name: z.string().min(2, "The minimum name is 2 characters"),
    age: z.number().int().min(1).max(100),
    email: z.email(),
    password1: z.string().min(6, "The minimum password is 6 characters"),
    password2: z.string().min(6, "The minimum password is 6 characters"),
    gender: z.enum(["male", "female"]),
    country: z.string().min(1, "Please select country"),
    terms: z.boolean().refine((terms) => terms === true, {
      message: "Please accept terms",
    }),
  })
  .refine((val) => val.password1 === val.password2, {
    path: ["password2"],
    message: "Passwords are not equal",
  });

export type FormFields = z.infer<typeof formSchema>;
