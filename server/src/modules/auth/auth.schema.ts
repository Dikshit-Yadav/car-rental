import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address"),

  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[1-9]\d{9,14}$/,
      "Please provide a valid phone number"
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),

  drivingLicense: z
    .string()
    .trim()
    .min(5, "Driving license is required")
    .max(50, "Driving license is invalid"),

  dateOfBirth: z
    .string()
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      "Please provide a valid date of birth"
    ),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(1, "Refresh token is required"),
});

export type RegisterSchemaInput =
  z.infer<typeof registerSchema>;

export type LoginSchemaInput =
  z.infer<typeof loginSchema>;

export type RefreshTokenSchemaInput =
  z.infer<typeof refreshTokenSchema>;