// src/db.js
const { Pool } = require('pg')
require('dotenv').config()

// Cria o pool de conexões com base nas variáveis de ambiente
const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 5432,
  database: process.env.DB_NAME     || 'pedidofacil',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
})

// Exporta apenas o pool, sem abrir conexão imediata
module.exports = pool
