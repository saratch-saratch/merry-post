import { z } from "zod";

export const RegisterUserSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(1, "Username is required"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, "Email is required")
      .email("Email is invalid"),
    displayName: z
      .string({
        required_error: "Display name is required",
      })
      .min(1, "Display name is required"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, "Password is required"),
    passwordConfirm: z
      .string({
        required_error: "Confirm your password",
      })
      .min(1, "Confirm your password"),
    jobId: z.number({
      required_error: "Job is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export const LoginUserSchema = z.object({
  username: z
    .string({
      required_error: "Username is rquired",
    })
    .min(1, "Username is required"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
