import { connection } from '../databases/mysqlConection.js'

export const login = async (req, res) => {
  const pool = await connection()
  try {
    const [result] = await pool.execute('SELECT * FROM login_chat')
    res.json(result)
  } catch (error) {
    console.error(`Failed to execute query: ${error.message}`)
    res.status(500).json({ message: 'An error occurred' })
    pool.end()
  } finally {
    pool.end()
  }
}
