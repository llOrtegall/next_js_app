import { Schema, model } from 'mongoose'

const Estado = {
  0: 'Nuevo',
  1: 'Bueno',
  2: 'Reparación',
  3: 'Dañado'
}

const Types = {
  0: 'Activo',
  1: 'Insumo'
}

const ItemsSchema = new Schema({
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: Number, required: true, enum: Object.keys(Types) },
  placa: { type: Number, required: true, unique: true, inmutable: true },
  serial: { type: String, required: true, unique: true, inmutable: true },
  estado: { type: Number, required: true, enum: Object.keys(Estado) },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  sucursal: { type: Schema.Types.ObjectId, ref: 'sucursales', required: true }
}, { timestamps: true })

export const ActivoModel = model('items', ItemsSchema)
