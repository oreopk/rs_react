import * as z from "zod";

const checkPassword = (p: string) => {
  return /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/.test(p);
};

export const formSchema = z
  .object({
    name: z.string().min(2, "The minimum name is 2 characters"),
    age: z.number().int().min(1).max(100),
    email: z.email(),
    password1: z
      .string()
      .min(6, "The minimum password is 6 characters")
      .refine(checkPassword, {
        message: "1 number, 1 upper, 1 lower, 1 special",
      }),
    password2: z
      .string()
      .min(6, "The minimum password is 6 characters")
      .refine(checkPassword, {
        message: "1 number, 1 upper, 1 lower, 1 special",
      }),
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
