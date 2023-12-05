import { Proceso, Company, State } from '../services/Definiciones.js'
import { connection } from '../databases/mysqlConection.js'
import { ValidateUser } from '../Schemas/UserSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import env from 'dotenv'

env.config()

const JWT_SECRET = process.env.JWT_SECRET
const BCRYPT_SALT_ROUNDS = 10

export const getUsers = async (req, res) => {
  const pool = await connection()

  try {
    const [result] = await pool.query('SELECT *, BIN_TO_UUID(id) FROM login_chat')

    result.forEach((element) => {
      element.estado = State({ estado: element.estado })
      element.empresa = Company({ empresa: element.empresa })
      element.proceso = Proceso({ proceso: element.proceso })
      delete element.id
    })

    return res.status(200).json(result)
  } catch (error) {
    pool.end()
    return res.status(500).json({ error: 'Error al obtener los usuarios' })
  } finally {
    pool.end()
  }
}

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

    const state = State({ estado: result[0].estado })
    if (state === 'Inactivo') {
      return res.status(401).json({ error: 'El Usuario se encuentra Inactivo' })
    }

    const { nombres, apellidos, username, telefono, correo, empresa, proceso, rol } = result[0]
    const token = jwt.sign({ nombres, apellidos, username, telefono, correo, empresa, proceso, rol }, JWT_SECRET)
    const empresahas = Company({ empresa }); const procesohas = Proceso({ proceso })
    return res.status(200)
      .json({ user: { nombres, apellidos, username, telefono, correo, empresa: empresahas, proceso: procesohas, rol }, token })
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

    // TODO: Validar que el usuario no exista
    const [result2] = await pool.query('SELECT documento FROM login_chat WHERE documento = ?', [documento])
    console.log(result2)
    if (result2.length > 0) {
      return res.status(401).json({ error: `El usuario con N° ${documento}, Ya Existe` })
    }

    // TODO: Generar la contraseña y el username de forma automatica y por defecto
    const password = `CP${documento.toString().slice(-3)}`
    const username = `CP${documento.toString()}`
    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)

    // TODO: Guardar el usuario en la base de datos
    const [UserCreado] = await pool.query(
      `INSERT INTO login_chat (nombres, apellidos, documento, telefono, correo, username, password, estado, empresa, proceso, rol) 
        VALUES (?, ?, ?, ?, ?, ?, ?, TRUE, ?, ?, ?);`,
      [nombres, apellidos, documento, telefono, correo, username, passwordHash, empresa, proceso, rol]
    )

    if (UserCreado.affectedRows === 1) {
      return res.status(201).json({ message: 'Usuario Registrado Correctamente' })
    }
  } catch (error) {
    pool.end()
    console.log(error)
    return res.status(500).json({ error: 'Error al registrar el usuario' })
  } finally {
    pool.end()
  }
}
