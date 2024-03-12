import { z } from "zod"
export const SignUpValidation = z.object({
    username: z.string().min(2,{message:'Too short'}),
    name: z.string().min(2,{message:'Too short'}),
    email:z.string().email(),
    password:z.string().min(8,{message:'Must be at least 8 charaters'}),
  })