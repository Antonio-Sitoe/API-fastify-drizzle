import { transactionsTable } from '@/db/schemas'
import { db } from '@/lib/drizzle'
import { sum } from 'drizzle-orm'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await db.query.transactionsTable.findMany()
    return {
      transactions,
    }
  })
  app.get('/summary', async () => {
    const summary = await db
      .select({
        value: sum(transactionsTable.amount),
      })
      .from(transactionsTable)

    return {
      summary,
    }
  })
  app.get('/:id', async (req) => {
    const getDetails = z.object({
      id: z.string().uuid(),
    })
    const { id } = getDetails.parse(req.params) as { id: string }

    const transation = await db.query.transactionsTable.findFirst({
      where: (transaction, { eq }) => eq(transaction.id, id),
    })

    return { transation }
  })

  app.post('/', async (request, response) => {
    try {
      const createTransactions = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']),
      })
      const { amount, title, type } = createTransactions.parse(request.body)

      await db.insert(transactionsTable).values({
        amount,
        title,
        type,
      })
      return response.status(201).send()
    } catch (error) {
      return response.status(500).send(error)
    }
  })
}
