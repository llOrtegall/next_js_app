import { userRoutes } from './routes/userRoutes.js'
import express from 'express'
import env from 'dotenv'

env.config()

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())

app.use(userRoutes)

app.listen(PORT, () => {
  console.log(`Server running on ==> http://localhost:${PORT}`)
})
