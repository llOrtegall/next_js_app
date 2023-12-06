import { ActivoModel } from '../Models/ItemsModels.js'

export const getItems = async (req, res) => {
  try {
    const items = await ActivoModel.find().populate('sucursal')
    return res.status(200).json(items)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}

export const createItem = async (req, res) => {
  const { nombre, marca, model, type, placa, serial, estado, descripcion, precio, sucursal } = req.body
  const newItem = new ActivoModel({ nombre, marca, model, type, placa, serial, estado, descripcion, precio, sucursal })
  try {
    const result = await newItem.save()
    console.log(result)
    return res.status(201).json(result)
  } catch (error) {
    console.log(error)
    return res.status(409).json({ message: error.message })
  }
}
