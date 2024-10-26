import { createConnection, RowDataPacket } from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';
import { Connection } from 'mysql2/promise';

const connection = createConnection({
  host: '172.20.1.70',
  user: 'root',
  password: 'rooy',
  database: 'login'
});

interface User extends RowDataPacket{
  id: number;
  name: string;
  email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  let conn: Connection | undefined;

  try {
    conn = await connection;
    const [rows] = await conn.query<User[]>('SELECT * FROM login_users');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
}
