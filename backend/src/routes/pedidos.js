const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM pedidos ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar pedidos' })
  }
})

router.post('/', async (req, res) => {
  const { cliente, item, quantidade } = req.body

  if (!cliente || !item || !quantidade) {
    return res.status(400).json({ erro: 'Campos obrigatórios: cliente, item, quantidade' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO pedidos (cliente, item, quantidade, status)
       VALUES ($1, $2, $3, 'pendente')
       RETURNING *`,
      [cliente, item, quantidade]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao criar pedido' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'SELECT * FROM pedidos WHERE id = $1', [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Pedido não encontrado' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar pedido' })
  }
})

module.exports = router
