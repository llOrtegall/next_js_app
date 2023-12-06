import { createSucursal } from '../Controllers/sucursales.controllers.js'
import { Router } from 'express'

export const sucursalesRouter = Router()

sucursalesRouter.post('/createSucursal', createSucursal)
