import fastify from 'fastify'
import fastifyCors from '@fastify/cors'

import { ZodTypeProvider } from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors)

// users

//

app.listen(
  {
    port: 3333,
  },
  () => {
    console.log('Server is Running on http://localhost:3333')
  }
)
