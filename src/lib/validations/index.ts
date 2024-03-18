import * as z from 'zod';


export const SignupValidation = z.object({
  name: z.string().min(3, { message: "Too short name" }),
  username: z.string().min(3, { message: 'Username must contain atleast 3 characters.' }).max(50),
  email: z.string().min(8, { message: "Too short" }),
  password: z.string().min(8, { message: "password must contain at least 8 characters" })
});

export const SigninValidation = z.object({
  email: z.string().min(8, { message: "Too short" }),
  password: z.string().min(8, { message: "password must contain at least 8 characters" })
});

export const PostValidation = z.object({
  caption: z.string().min(5, {
    message: "Username must be at least r characters.",
  }).max(2200, "Cannot write more then 2200 characters"),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
})


export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});
