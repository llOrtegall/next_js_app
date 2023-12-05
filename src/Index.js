import { userRoutes } from './routes/userRoutes.js'
import cors from 'cors'
import express from 'express'
import env from 'dotenv'

env.config()

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
))

app.use(userRoutes)

app.listen(PORT, () => {
  console.log(`Server running on ==> http://localhost:${PORT}`)
})