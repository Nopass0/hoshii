import { z } from "zod";

// User schema
export const UserSchema = z.object({
  id: z.number(),
  login: z.string().min(3),
  username: z.string(),
  isAdmin: z.boolean(),
  isPremium: z.boolean().optional(), // Make this optional
  avatar: z.string().nullable(),
  createdAt: z.string().datetime().optional(), // Make this optional
  updatedAt: z.string().datetime().optional(), // Make this optional
});

// Login credentials schema
export const LoginCredentialsSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
});

// Registration data schema
export const RegisterDataSchema = LoginCredentialsSchema.extend({
  username: z.string().min(3),
});

// Auth response schema
export const AuthResponseSchema = z.object({
  token: z.string(),
  user: UserSchema.optional(),
});

// Export types
export type User = z.infer<typeof UserSchema>;
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type RegisterData = z.infer<typeof RegisterDataSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
