import { Router } from 'express'
import { login, register, getUsers } from '../controllers/user.controllers.js'

export const userRoutes = Router()

userRoutes.post('/login', login)

userRoutes.post('/register', register)

userRoutes.get('/users', getUsers)
