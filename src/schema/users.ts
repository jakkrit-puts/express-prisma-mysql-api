import { z } from 'zod';

export const SignupSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty({ message: "please enter email!" }),
  password: z.string().min(6).nonempty()
})

