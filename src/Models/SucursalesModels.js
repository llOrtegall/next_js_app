import { Schema, model } from 'mongoose'

const SucursalSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  sucursal: { type: Number, required: true, unique: true, inmutable: true }
}, { timestamps: true })

export const SucursalModel = model('sucursales', SucursalSchema)
