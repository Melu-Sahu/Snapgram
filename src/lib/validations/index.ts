import * as z from 'zod';


export const SignupValidation = z.object({
    name: z.string().min(3, {message: "Too short name"}),
    username: z.string().min(3, { message: 'Username must contain atleast 3 characters.' }).max(50),
    email: z.string().min(8, {message: "Too short"}),
    password: z.string().min(8, {message: "password must contain at least 8 characters"})
  });