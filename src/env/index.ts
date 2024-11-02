import { z } from 'zod'
const schema = z.object({
  PORT: z.number().default(3333),
})
export const Env = schema.parse(process.env)
