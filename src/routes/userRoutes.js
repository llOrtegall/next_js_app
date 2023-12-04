import { Router } from 'express'
import { login, register } from '../controllers/user.controllers.js'

export const userRoutes = Router()

userRoutes.post('/login', login)

userRoutes.post('/register', register)
