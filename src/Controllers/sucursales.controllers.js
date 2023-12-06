import { SucursalModel } from '../Models/SucursalesModels.js'

export const createSucursal = async (req, res) => {
  const { nombre, direccion, sucursal } = req.body
  const newSucursal = new SucursalModel({ nombre, direccion, sucursal })
  try {
    const result = await newSucursal.save()
    console.log(result)
    return res.status(201).json(result)
  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}
