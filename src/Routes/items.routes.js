import { Router } from 'express'

export const itemsRouter = Router()

itemsRouter.post('/createItem', createItem)
