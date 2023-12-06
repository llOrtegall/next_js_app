import { ConnectMongoDB } from './Databases/ConnectionMongoDB.js'
import { sucursalesRouter } from './Routes/sucurales.routes.js'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  withCredentials: true
}))

ConnectMongoDB()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(sucursalesRouter)

app.listen(3000, () => {
  console.log('Server running on: http://localhost:3000')
})
