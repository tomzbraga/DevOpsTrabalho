const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'pedidofacil',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
})

pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message)
  } else {
    console.log('Banco de dados conectado com sucesso!')
    release()
  }
})

module.exports = pool
