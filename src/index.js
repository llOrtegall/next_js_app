import express from 'express'
import { ConnectMongoDB } from './Databases/ConnectionMongoDB.js'

const app = express()

ConnectMongoDB()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server running on: http://localhost:3000')
})
