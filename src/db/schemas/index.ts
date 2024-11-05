import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
})

export const transactionsTable = sqliteTable('transactions', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  amount: int().notNull(),
  type: text().notNull(),
})
