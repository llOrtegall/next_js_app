import { createItem, getItems } from '../Controllers/item.controller.js'
import { Router } from 'express'

export const itemsRouter = Router()

itemsRouter.post('/createItem', createItem)

itemsRouter.get('/getItems', getItems)
