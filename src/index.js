import express from 'express'
import { ConnectMongoDB } from './Databases/ConnectionMongoDB'

const app = express()

ConnectMongoDB()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
