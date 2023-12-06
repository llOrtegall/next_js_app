import { Schema, model } from 'mongoose'

const SucursalSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  sucursal: { type: Number, required: true, unique: true, inmutable: true },
  activos: [{ type: Schema.Types.ObjectId, ref: 'Activo' }]
}, { timestamps: true })

export const SucursalModel = model('Sucursal', SucursalSchema)
