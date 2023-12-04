import { createConnection } from 'mysql2/promise'

export const connection = async () => {
  try {
    const pool = await createConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    })
    return pool
  } catch (error) {
    console.error(`Failed to create a connection: ${error.message}`)
    throw error
  }
}
