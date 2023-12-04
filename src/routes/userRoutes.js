import { Router } from 'express'
import { login } from '../controllers/user.controllers.js'

export const userRoutes = Router()

userRoutes.get('/login', login)
