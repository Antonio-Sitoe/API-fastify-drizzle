import fastify from 'fastify'
import fastifyCors from '@fastify/cors'

import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { errorHandler } from '@/http/routes/error-handler'
import { CreateUser } from './routes/users/create-users'
import { signInUser } from './routes/users/sign-in'
import { passwordRecover } from './routes/users/password-reset'
import { knex } from '@/lib/knex'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)
app.register(fastifyCors)

/*
  Migration - um controle de versao
  historico de mudancas feitas no banco de dados

 */

app.get('/', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transacao de Teste',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

app.register(CreateUser)
app.register(signInUser)
app.register(passwordRecover)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('server running in http://localhost:3333')
  })
