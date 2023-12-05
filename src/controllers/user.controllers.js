import { Proceso, Company } from '../services/Definiciones.js'
import { connection } from '../databases/mysqlConection.js'
import { ValidateUser } from '../Schemas/UserSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import env from 'dotenv'

env.config()

const JWT_SECRET = process.env.JWT_SECRET

export const login = async (req, res) => {
  const { user, password } = req.body
  // TODO: Primero valida que lleguen las credenciales
  if (!user || !password) {
    return res.status(400).json({ error: 'El usuario y la contraseña son requeridos' })
  }

  const pool = await connection()

  try {
    const [result] = await pool.query('SELECT * FROM login_chat WHERE username = ?', [user])
    if (result.length === 0) {
      return res.status(401).json({ error: 'El Usuario No Existe' })
    }
    const passwordMatches = await bcrypt.compare(password, result[0].password)

    if (!passwordMatches) {
      return res.status(401).json({ error: 'Clave Invalida Retifiquela' })
    }
    const { nombres, apellidos, username, telefono, correo, empresa, proceso, rol } = result[0]
    const token = jwt.sign({ nombres, apellidos, username, telefono, correo, empresa, proceso, rol }, JWT_SECRET)
    const empresahas = Company({ empresa }); const procesohas = Proceso({ proceso })
    return res.status(200)
      .json({ user: { nombres, apellidos, username, telefono, correo, empresahas, procesohas, rol }, token })
  } catch (error) {
    pool.end()
    return res.status(401).json({ error: 'Error al iniciar sesion' })
  } finally {
    pool.end()
  }
}

export const register = async (req, res) => {
  // TODO: Validar que lleguen los datos requeridos y de forma correcta
  const result = await ValidateUser(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error })
  }

  const pool = await connection()

  try {
    const { nombres, apellidos, documento, telefono, correo, empresa, proceso, rol } = result.data
    const password = `CP${documento.toString().slice(-3)}`
    const username = `CP${documento.toString()}`
    const passwordHash = await bcrypt.hash(password, 10)
  } catch (error) {

  }
}
